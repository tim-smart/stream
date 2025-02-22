import * as Cause from "@effect/io/Cause"
import * as Deferred from "@effect/io/Deferred"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as Ref from "@effect/io/Ref"
import * as Scope from "@effect/io/Scope"
import * as TSemaphore from "@effect/stm/TSemaphore"
import * as Stream from "@effect/stream/Stream"
import * as Take from "@effect/stream/Take"
import * as it from "@effect/stream/test/utils/extend"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Either from "@fp-ts/data/Either"
import * as Equal from "@fp-ts/data/Equal"
import { identity, pipe } from "@fp-ts/data/Function"
import { assert, describe } from "vitest"

describe.concurrent("Stream", () => {
  it.effect("branchAfter - switches streams", () =>
    Effect.gen(function*($) {
      const result = yield* $(
        pipe(
          Stream.fromChunk(Chunk.range(0, 5)),
          Stream.branchAfter(1, (values) => {
            if (Equal.equals(values, Chunk.make(0))) {
              return Stream.identity<never, never, number>()
            }
            throw new Error("should have branched after 0")
          }),
          Stream.runCollect
        )
      )
      assert.deepStrictEqual(Array.from(result), [1, 2, 3, 4, 5])
    }))

  it.effect("branchAfter - emits data if less than n elements are collected", () =>
    Effect.gen(function*($) {
      const result = yield* $(
        pipe(
          Stream.fromChunk(Chunk.range(1, 5)),
          Stream.branchAfter(6, Stream.prepend),
          Stream.runCollect
        )
      )
      assert.deepStrictEqual(Array.from(result), [1, 2, 3, 4, 5])
    }))

  it.effect("branchAfter - applies the new stream once on remaining upstream", () =>
    Effect.gen(function*($) {
      const result = yield* $(
        pipe(
          Stream.fromIterable(Chunk.range(1, 5)),
          Stream.rechunk(2),
          Stream.branchAfter(1, Stream.prepend),
          Stream.runCollect
        )
      )
      assert.deepStrictEqual(Array.from(result), [1, 2, 3, 4, 5])
    }))

  it.effect("execute", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<number>()))
      yield* $(Stream.runDrain(Stream.execute(pipe(ref, Ref.set(Chunk.fromIterable([1]))))))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [1])
    }))

  it.effect("flatMap - deep flatMap stack safety", () =>
    Effect.gen(function*($) {
      const fib = (n: number): Stream.Stream<never, never, number> =>
        n <= 1 ?
          Stream.succeed(n) :
          pipe(
            fib(n - 1),
            Stream.flatMap((a) =>
              pipe(
                fib(n - 2),
                Stream.flatMap((b) => Stream.succeed(a + b))
              )
            )
          )
      const result = yield* $(Stream.runCollect(fib(10)))
      assert.deepStrictEqual(Array.from(result), [55])
    }))

  it.effect("flatMap - left identity", () =>
    Effect.gen(function*($) {
      const f = (n: number) => Stream.succeed(n * 2)
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(Stream.make(1), Stream.flatMap(f), Stream.runCollect),
        result2: Stream.runCollect(f(1))
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("flatMap - right identity", () =>
    Effect.gen(function*($) {
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(Stream.make(1), Stream.flatMap((n) => Stream.make(n)), Stream.runCollect),
        result2: Stream.runCollect(Stream.make(1))
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("flatMap - associativity", () =>
    Effect.gen(function*($) {
      const stream = Stream.range(0, 5)
      const f = (n: number) => Stream.succeed(n * 2)
      const g = (n: number) => Stream.succeed(String(n))
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(stream, Stream.flatMap(f), Stream.flatMap(g), Stream.runCollect),
        result2: pipe(stream, Stream.flatMap((n) => pipe(f(n), Stream.flatMap(g))), Stream.runCollect)
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("flatMap - inner finalizers", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<number>()))
      const push = (n: number) => pipe(ref, Ref.update(Chunk.append(n)))
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.make(
          Stream.acquireRelease(push(1), () => push(1)),
          Stream.fromEffect(push(2)),
          pipe(
            Stream.acquireRelease(push(3), () => push(3)),
            Stream.crossRight(Stream.fromEffect(pipe(
              latch,
              Deferred.succeed<void>(void 0),
              Effect.zipRight(Effect.never())
            )))
          )
        ),
        Stream.flatMap(identity),
        Stream.runDrain,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      yield* $(Fiber.interrupt(fiber))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [1, 1, 2, 3, 3])
    }))

  it.effect("flatMap - finalizer ordering #1", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<string>()))
      const push = (message: string) => pipe(ref, Ref.update(Chunk.append(message)))
      const chunks = Chunk.make(Chunk.singleton(void 0), Chunk.singleton(void 0))
      yield* $(pipe(
        Stream.acquireRelease(push("open 1"), () => push("close 1")),
        Stream.flatMap(() =>
          pipe(
            Stream.fromChunks(...chunks),
            Stream.tap(() => push("use 2")),
            Stream.ensuring(push("close 2")),
            Stream.flatMap(() =>
              pipe(
                Stream.acquireRelease(push("open 3"), () => push("close 3")),
                Stream.flatMap(() =>
                  pipe(
                    Stream.fromChunks(...chunks),
                    Stream.tap(() => push("use 4")),
                    Stream.ensuring(push("close 4"))
                  )
                )
              )
            )
          )
        ),
        Stream.runDrain
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [
        "open 1",
        "use 2",
        "open 3",
        "use 4",
        "use 4",
        "close 4",
        "close 3",
        "use 2",
        "open 3",
        "use 4",
        "use 4",
        "close 4",
        "close 3",
        "close 2",
        "close 1"
      ])
    }))

  it.effect("flatMap - finalizer ordering #2", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<string>()))
      const push = (message: string) => pipe(ref, Ref.update(Chunk.append(message)))
      const chunks = Chunk.make(Chunk.singleton(1), Chunk.singleton(2))
      yield* $(pipe(
        Stream.fromChunks(...chunks),
        Stream.tap(() => push("use 1")),
        Stream.flatMap(() => Stream.acquireRelease(push("open 2"), () => push("close 2"))),
        Stream.runDrain
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [
        "use 1",
        "open 2",
        "close 2",
        "use 1",
        "open 2",
        "close 2"
      ])
    }))

  it.effect("flatMap - exit signal", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const inner = pipe(
        Stream.acquireRelease(Effect.unit(), (_, exit) =>
          pipe(
            exit,
            Exit.match(
              () => pipe(ref, Ref.set(true)),
              Effect.unit
            )
          )),
        Stream.flatMap(() => Stream.fail("Ouch"))
      )
      yield* $(pipe(
        Stream.succeed(void 0),
        Stream.flatMap(() => inner),
        Stream.runDrain,
        Effect.either
      ))
      const result = yield* $(Ref.get(ref))
      assert.isTrue(result)
    }))

  it.effect("flatMap - finalizers are registered in the proper order", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<number>()))
      const push = (n: number) => pipe(ref, Ref.update(Chunk.prepend(n)))
      yield* $(pipe(
        Stream.finalizer(push(1)),
        Stream.flatMap(() => Stream.finalizer(push(2))),
        Stream.toPull,
        Effect.flatten,
        Effect.scoped
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [1, 2])
    }))

  it.effect("flatMap - early release finalizer concatenation is preserved", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<number>()))
      const push = (n: number) => pipe(ref, Ref.update(Chunk.prepend(n)))
      const stream = pipe(
        Stream.finalizer(push(1)),
        Stream.flatMap(() => Stream.finalizer(push(2)))
      )
      const result = yield* $(pipe(
        Scope.make(),
        Effect.flatMap((scope) =>
          pipe(
            scope,
            Scope.extend(Stream.toPull(stream)),
            Effect.flatMap((pull) =>
              pipe(
                pull,
                Effect.zipRight(pipe(scope, Scope.close(Exit.unit()))),
                Effect.zipRight(Ref.get(ref))
              )
            )
          )
        )
      ))
      assert.deepStrictEqual(Array.from(result), [1, 2])
    }))

  it.effect("flatMapPar - guarantee ordering", () =>
    Effect.gen(function*($) {
      const stream = Stream.fromIterable([1, 2, 3, 4, 5])
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(stream, Stream.flatMap((n) => Stream.make(n, n)), Stream.runCollect),
        result2: pipe(stream, Stream.flatMapPar(1)((n) => Stream.make(n, n)), Stream.runCollect)
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("flatMapPar - consistency with flatMap", () =>
    Effect.gen(function*($) {
      const stream = Stream.fromIterable([1, 2, 3, 4, 5])
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(
          stream,
          Stream.flatMap((n) => Stream.make(n, n)),
          Stream.runCollect
        ),
        result2: pipe(
          stream,
          Stream.flatMapPar(100)((n) => Stream.make(n, n)),
          Stream.runCollect
        )
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("flatMapPar - interruption propagation", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.make(void 0),
        Stream.flatMapPar(1)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runDrain,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      yield* $(Fiber.interrupt(fiber))
      const result = yield* $(Ref.get(ref))
      assert.isTrue(result)
    }))

  it.effect("flatMap - inner errors interrupt all fibers", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(
          Stream.fromEffect(
            pipe(
              latch,
              Deferred.succeed<void>(void 0),
              Effect.zipRight(Effect.never()),
              Effect.onInterrupt(() => pipe(ref, Ref.set(true)))
            )
          ),
          Stream.fromEffect(
            pipe(
              Deferred.await(latch),
              Effect.zipRight(Effect.fail("Ouch"))
            )
          )
        ),
        Stream.flatMapPar(2)(identity),
        Stream.runDrain,
        Effect.either
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("flatMapPar - outer errors interrupt all fiberrs", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(void 0),
        Stream.concat(Stream.fromEffect(pipe(
          Deferred.await(latch),
          Effect.zipRight(Effect.fail("Ouch"))
        ))),
        Stream.flatMapPar(2)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runDrain,
        Effect.either
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("flatMapPar - inner defects interrupt all fibers", () =>
    Effect.gen(function*($) {
      const defect = Cause.RuntimeException("Ouch")
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(
          Stream.fromEffect(pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true)))
          )),
          Stream.fromEffect(pipe(
            Deferred.await(latch),
            Effect.zipRight(Effect.die(defect))
          ))
        ),
        Stream.flatMapPar(2)(identity),
        Stream.runDrain,
        Effect.exit
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(defect))
    }))

  it.effect("flatMapPar - outer defects interrupt all fibers", () =>
    Effect.gen(function*($) {
      const defect = Cause.RuntimeException("Ouch")
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(void 0),
        Stream.concat(Stream.fromEffect(pipe(
          Deferred.await(latch),
          Effect.zipRight(Effect.die(defect))
        ))),
        Stream.flatMapPar(2)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runDrain,
        Effect.exit
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(defect))
    }))

  it.effect("flatMapPar - finalizer ordering", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<string>()))
      const push = (message: string) => pipe(ref, Ref.update(Chunk.append(message)))
      const inner = Stream.acquireRelease(push("Inner Acquire"), () => push("Inner Release"))
      yield* $(pipe(
        Stream.acquireRelease(
          pipe(
            push("Outer Acquire"),
            Effect.as(inner)
          ),
          () => push("Outer Release")
        ),
        Stream.flatMapPar(2)(identity),
        Stream.runDrain
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [
        "Outer Acquire",
        "Inner Acquire",
        "Inner Release",
        "Outer Release"
      ])
    }))

  it.effect("flatMapParSwitch - guarantee ordering no parallelism", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const semaphore = yield* $(TSemaphore.make(1))
      yield* $(pipe(
        Stream.make(1, 2, 3, 4),
        Stream.flatMapParSwitch(1)((n) => {
          if (n > 3) {
            return pipe(
              Stream.acquireRelease(Effect.unit(), () => pipe(ref, Ref.set(true))),
              Stream.flatMap(() => Stream.empty)
            )
          }
          return pipe(
            Stream.scoped(TSemaphore.withPermitScoped(semaphore)),
            Stream.flatMap(() => Stream.never())
          )
        }),
        Stream.runDrain
      ))
      const result = yield* $(TSemaphore.withPermit(semaphore)(Ref.get(ref)))
      assert.isTrue(result)
    }))

  it.effect("flatMapParSwitch - guarantee ordering with parallelism", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(0))
      const semaphore = yield* $(TSemaphore.make(4))
      yield* $(pipe(
        Stream.range(1, 13),
        Stream.flatMapParSwitch(4)((n) => {
          if (n > 8) {
            return pipe(
              Stream.acquireRelease(
                Effect.unit(),
                () => pipe(ref, Ref.update((n) => n + 1))
              ),
              Stream.flatMap(() => Stream.empty)
            )
          }
          return pipe(
            Stream.scoped(TSemaphore.withPermitScoped(semaphore)),
            Stream.flatMap(() => Stream.never())
          )
        }),
        Stream.runDrain
      ))
      const result = yield* $(pipe(
        Ref.get(ref),
        TSemaphore.withPermits(4)(semaphore)
      ))
      assert.strictEqual(result, 4)
    }))

  it.effect("flatMapParSwitch - short circuiting", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(Stream.never(), Stream.make(1)),
        Stream.flatMapParSwitch(2)(identity),
        Stream.take(1),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [1])
    }))

  it.effect("flatMapParSwitch - interruption propagation", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.make(void 0),
        Stream.flatMapParSwitch(1)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      yield* $(Fiber.interrupt(fiber))
      const result = yield* $(Ref.get(ref))
      assert.isTrue(result)
    }))

  it.effect("flatMapParSwitch - inner errors interrupt all fibers", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(
          Stream.fromEffect(
            pipe(
              latch,
              Deferred.succeed<void>(void 0),
              Effect.zipRight(Effect.never()),
              Effect.onInterrupt(() => pipe(ref, Ref.set(true)))
            )
          ),
          Stream.fromEffect(
            pipe(
              Deferred.await(latch),
              Effect.zipRight(Effect.fail("Ouch"))
            )
          )
        ),
        Stream.flatMapParSwitch(2)(identity),
        Stream.runDrain,
        Effect.either
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("flatMapParSwitch - outer errors interrupt all fibers", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(void 0),
        Stream.concat(Stream.fromEffect(pipe(
          Deferred.await(latch),
          Effect.zipRight(Effect.fail("Ouch"))
        ))),
        Stream.flatMapParSwitch(2)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runDrain,
        Effect.either
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("flatMapParSwitch - inner defects interrupt all fibers", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("Ouch")
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(
          Stream.fromEffect(
            pipe(
              latch,
              Deferred.succeed<void>(void 0),
              Effect.zipRight(Effect.never()),
              Effect.onInterrupt(() => pipe(ref, Ref.set(true)))
            )
          ),
          Stream.fromEffect(
            pipe(
              Deferred.await(latch),
              Effect.zipRight(Effect.die(error))
            )
          )
        ),
        Stream.flatMapParSwitch(2)(identity),
        Stream.runDrain,
        Effect.exit
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("flatMapParSwitch - outer defects interrupt all fibers", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("Ouch")
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const result = yield* $(pipe(
        Stream.make(void 0),
        Stream.concat(Stream.fromEffect(pipe(
          Deferred.await(latch),
          Effect.zipRight(Effect.die(error))
        ))),
        Stream.flatMapParSwitch(2)(() =>
          pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.never()),
            Effect.onInterrupt(() => pipe(ref, Ref.set(true))),
            Stream.fromEffect
          )
        ),
        Stream.runDrain,
        Effect.exit
      ))
      const cancelled = yield* $(Ref.get(ref))
      assert.isTrue(cancelled)
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("flatMapParSwitch - finalizer ordering", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<string>()))
      const push = (message: string) => pipe(ref, Ref.update(Chunk.append(message)))
      const inner = Stream.acquireRelease(push("Inner Acquire"), () => push("Inner Release"))
      yield* $(pipe(
        Stream.acquireRelease(
          pipe(
            push("Outer Acquire"),
            Effect.as(inner)
          ),
          () => push("Outer Release")
        ),
        Stream.flatMapParSwitch(2)(identity),
        Stream.runDrain
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(Array.from(result), [
        "Outer Acquire",
        "Inner Acquire",
        "Inner Release",
        "Outer Release"
      ])
    }))

  it.effect("flattenChunks", () =>
    Effect.gen(function*($) {
      const chunks = Chunk.make(Chunk.make(1, 2), Chunk.make(3, 4), Chunk.make(5, 6))
      const result = yield* $(pipe(
        Stream.fromChunks(chunks),
        Stream.flattenChunks,
        Stream.chunks,
        Stream.runCollect
      ))
      assert.deepStrictEqual(
        Array.from(result).map((chunk) => Array.from(chunk)),
        Array.from(chunks).map((chunk) => Array.from(chunk))
      )
    }))

  it.effect("flattenExitOption - happy path", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.range(0, 10),
        Stream.toQueue(1),
        Effect.flatMap((queue) =>
          pipe(
            Stream.fromQueue(queue),
            Stream.map((take) => take.exit),
            Stream.flattenExitOption,
            Stream.runCollect
          )
        ),
        Effect.scoped
      ))
      assert.deepStrictEqual(
        Array.from(Chunk.flatten(result)),
        Array.from(Chunk.range(0, 9))
      )
    }))

  it.effect("flattenExitOption - failure", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.range(0, 10),
        Stream.concat(Stream.fail(error)),
        Stream.toQueue(1),
        Effect.flatMap((queue) =>
          pipe(
            Stream.fromQueue(queue),
            Stream.map((take) => take.exit),
            Stream.flattenExitOption,
            Stream.runCollect
          )
        ),
        Effect.scoped,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.fail(error))
    }))

  it.effect("flattenIterables", () =>
    Effect.gen(function*($) {
      const iterables = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const result = yield* $(pipe(
        Stream.fromIterable(iterables),
        Stream.flattenIterables,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), iterables.flatMap(identity))
    }))

  it.effect("flattenTake - happy path", () =>
    Effect.gen(function*($) {
      const chunks = Chunk.make(Chunk.range(0, 3), Chunk.range(4, 8))
      const result = yield* $(pipe(
        Stream.fromChunks(...chunks),
        Stream.mapChunks((chunk) => Chunk.singleton(Take.chunk(chunk))),
        Stream.flattenTake,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), Array.from(Chunk.flatten(chunks)))
    }))

  it.effect("flattenTake - stop collecting on Exit.Failure", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(
          Take.chunk(Chunk.make(1, 2)),
          Take.singleton(3),
          Take.end
        ),
        Stream.flattenTake,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [1, 2, 3])
    }))

  it.effect("flattenTake - works with empty chunks", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(
          Take.chunk(Chunk.empty<number>()),
          Take.chunk(Chunk.empty<number>())
        ),
        Stream.flattenTake,
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("flattenTake - works with empty streams", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.fromIterable<Take.Take<never, never>>([]),
        Stream.flattenTake,
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))
})
