import * as Cause from "@effect/io/Cause"
import * as Deferred from "@effect/io/Deferred"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as Ref from "@effect/io/Ref"
import * as Sink from "@effect/stream/Sink"
import * as Stream from "@effect/stream/Stream"
import * as it from "@effect/stream/test/utils/extend"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Either from "@fp-ts/data/Either"
import { pipe } from "@fp-ts/data/Function"
import * as Option from "@fp-ts/data/Option"
import { assert, describe } from "vitest"

describe.concurrent("Stream", () => {
  it.effect("async", () =>
    Effect.gen(function*($) {
      const array = [1, 2, 3, 4, 5]
      const result = yield* $(pipe(
        Stream.async<never, never, number>((emit) => {
          array.forEach((n) => {
            emit(Effect.succeed(Chunk.singleton(n)))
          })
        }),
        Stream.take(array.length),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), array)
    }))

  it.effect("asyncEffect - simple example", () =>
    Effect.gen(function*($) {
      const array = [1, 2, 3, 4, 5]
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.asyncEffect<never, never, number>((emit) => {
          array.forEach((n) => {
            emit(Effect.succeed(Chunk.singleton(n)))
          })
          return pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.zipRight(Effect.unit())
          )
        }),
        Stream.take(array.length),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      const result = yield* $(Fiber.join(fiber))
      assert.deepStrictEqual(Array.from(result), array)
    }))

  it.effect("asyncEffect - handles errors", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncEffect<never, Cause.RuntimeException, number>((emit) => {
          emit.fromEffect(Effect.fail(error))
          return Effect.unit()
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.fail(error))
    }))

  it.effect("asyncEffect - handles defects", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncEffect<never, Cause.RuntimeException, number>(() => {
          throw error
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("asyncEffect - signals the end of the stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.asyncEffect<never, never, number>((emit) => {
          emit(Effect.fail(Option.none))
          return Effect.unit()
        }),
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("asyncEffect - backpressure", () =>
    Effect.gen(function*($) {
      const refCount = yield* $(Ref.make(0))
      const refDone = yield* $(Ref.make(false))
      const stream = Stream.asyncEffect<never, Option.Option<never>, number>((emit) => {
        Promise.all(
          // 1st consumed by sink, 2-6 – in queue, 7th – back pressured
          [1, 2, 3, 4, 5, 6, 7].map((n) =>
            emit.fromEffectChunk(
              pipe(
                refCount,
                Ref.set(n),
                Effect.zipRight(Effect.succeed(Chunk.singleton(1)))
              )
            )
          )
        ).then(() =>
          emit.fromEffect(
            pipe(
              refDone,
              Ref.set(true),
              Effect.zipRight(Effect.fail(Option.none))
            )
          )
        )
        return Effect.unit()
      }, 5)
      const sink = pipe(Sink.take<number>(1), Sink.zipRight(Sink.never()))
      const fiber = yield* $(pipe(stream, Stream.run(sink), Effect.fork))
      yield* $(pipe(Ref.get(refCount), Effect.repeatWhile((n) => n !== 7)))
      const result = yield* $(Ref.get(refDone))
      yield* $(Fiber.interrupt(fiber))
      assert.isFalse(result)
    }))

  it.effect("asyncInterrupt - left", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(false))
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.asyncInterrupt<never, never, void>((emit) => {
          emit.chunk(Chunk.singleton(void 0))
          return Either.left(pipe(ref, Ref.set(true)))
        }),
        Stream.tap(() => pipe(latch, Deferred.succeed<void>(void 0))),
        Stream.runDrain,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      yield* $(Fiber.interrupt(fiber))
      const result = yield* $(Ref.get(ref))
      assert.isTrue(result)
    }))

  it.effect("asyncInterrupt - right", () =>
    Effect.gen(function*($) {
      const chunk = Chunk.range(1, 5)
      const result = yield* $(pipe(
        Stream.asyncInterrupt<never, never, number>(() => Either.right(Stream.fromChunk(chunk))),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), Array.from(chunk))
    }))

  it.effect("asyncInterrupt - signals the end of the stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.asyncInterrupt<never, never, number>((emit) => {
          emit.end()
          return Either.left(Effect.unit())
        }),
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("asyncInterrupt - handles errors", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncInterrupt<never, Cause.RuntimeException, number>((emit) => {
          emit.fromEffect(Effect.fail(error))
          return Either.left(Effect.unit())
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.fail(error))
    }))

  it.effect("asyncInterrupt - handles defects", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncInterrupt<never, Cause.RuntimeException, number>(() => {
          throw error
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("asyncInterrupt - backpressure", () =>
    Effect.gen(function*($) {
      const refCount = yield* $(Ref.make(0))
      const refDone = yield* $(Ref.make(false))
      const stream = Stream.asyncInterrupt<never, Option.Option<never>, number>((emit) => {
        Promise.all(
          // 1st consumed by sink, 2-6 – in queue, 7th – back pressured
          [1, 2, 3, 4, 5, 6, 7].map((n) =>
            emit.fromEffectChunk(
              pipe(
                refCount,
                Ref.set(n),
                Effect.zipRight(Effect.succeed(Chunk.singleton(1)))
              )
            )
          )
        ).then(() =>
          emit.fromEffect(
            pipe(
              refDone,
              Ref.set(true),
              Effect.zipRight(Effect.fail(Option.none))
            )
          )
        )
        return Either.left(Effect.unit())
      }, 5)
      const sink = pipe(Sink.take<number>(1), Sink.zipRight(Sink.never()))
      const fiber = yield* $(pipe(stream, Stream.run(sink), Effect.fork))
      yield* $(pipe(Ref.get(refCount), Effect.repeatWhile((n) => n !== 7)))
      const result = yield* $(Ref.get(refDone))
      yield* $(pipe(Fiber.interrupt(fiber), Effect.exit))
      assert.isFalse(result)
    }))

  it.effect("asyncOption - signals the end of the stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.asyncOption<never, never, number>((emit) => {
          emit(Effect.fail(Option.none))
          return Option.none
        }),
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("asyncOption - some", () =>
    Effect.gen(function*($) {
      const chunk = Chunk.range(1, 5)
      const result = yield* $(pipe(
        Stream.asyncOption<never, never, number>(() => Option.some(Stream.fromChunk(chunk))),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), Array.from(chunk))
    }))

  it.effect("asyncOption - none", () =>
    Effect.gen(function*($) {
      const array = [1, 2, 3, 4, 5]
      const result = yield* $(pipe(
        Stream.asyncOption<never, never, number>((emit) => {
          array.forEach((n) => {
            emit(Effect.succeed(Chunk.singleton(n)))
          })
          return Option.none
        }),
        Stream.take(array.length),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), array)
    }))

  it.effect("asyncOption - handles errors", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncOption<never, Cause.RuntimeException, number>((emit) => {
          emit.fromEffect(Effect.fail(error))
          return Option.none
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.fail(error))
    }))

  it.effect("asyncOption - handles defects", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncOption<never, Cause.RuntimeException, number>(() => {
          throw error
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("asyncOption - backpressure", () =>
    Effect.gen(function*($) {
      const refCount = yield* $(Ref.make(0))
      const refDone = yield* $(Ref.make(false))
      const stream = Stream.asyncOption<never, Option.Option<never>, number>((emit) => {
        Promise.all(
          // 1st consumed by sink, 2-6 – in queue, 7th – back pressured
          [1, 2, 3, 4, 5, 6, 7].map((n) =>
            emit.fromEffectChunk(
              pipe(
                refCount,
                Ref.set(n),
                Effect.zipRight(Effect.succeed(Chunk.singleton(1)))
              )
            )
          )
        ).then(() =>
          emit.fromEffect(
            pipe(
              refDone,
              Ref.set(true),
              Effect.zipRight(Effect.fail(Option.none))
            )
          )
        )
        return Option.none
      }, 5)
      const sink = pipe(Sink.take<number>(1), Sink.zipRight(Sink.never()))
      const fiber = yield* $(pipe(stream, Stream.run(sink), Effect.fork))
      yield* $(pipe(Ref.get(refCount), Effect.repeatWhile((n) => n !== 7)))
      const result = yield* $(Ref.get(refDone))
      yield* $(pipe(Fiber.interrupt(fiber), Effect.exit))
      assert.isFalse(result)
    }))

  it.effect("asyncScoped", () =>
    Effect.gen(function*($) {
      const array = [1, 2, 3, 4, 5]
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        Stream.asyncScoped<never, never, number>((cb) => {
          array.forEach((n) => {
            cb(Effect.succeed(Chunk.singleton(n)))
          })
          return pipe(
            latch,
            Deferred.succeed<void>(void 0),
            Effect.asUnit
          )
        }),
        Stream.take(array.length),
        Stream.run(Sink.collectAll()),
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      const result = yield* $(Fiber.join(fiber))
      assert.deepStrictEqual(Array.from(result), array)
    }))

  it.effect("asyncScoped - signals the end of the stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.asyncScoped<never, never, number>((cb) => {
          cb(Effect.fail(Option.none))
          return Effect.unit()
        }),
        Stream.runCollect
      ))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("asyncScoped - handles errors", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncScoped<never, Cause.RuntimeException, number>((cb) => {
          cb(Effect.fail(Option.some(error)))
          return Effect.unit()
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.fail(error))
    }))

  it.effect("asyncScoped - handles defects", () =>
    Effect.gen(function*($) {
      const error = Cause.RuntimeException("boom")
      const result = yield* $(pipe(
        Stream.asyncScoped<never, Cause.RuntimeException, number>(() => {
          throw error
        }),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(Exit.unannotate(result), Exit.die(error))
    }))

  it.effect("asyncScoped - backpressure", () =>
    Effect.gen(function*($) {
      const refCount = yield* $(Ref.make(0))
      const refDone = yield* $(Ref.make(false))
      const stream = Stream.asyncScoped<never, Option.Option<never>, number>((cb) => {
        Promise.all(
          // 1st consumed by sink, 2-6 – in queue, 7th – back pressured
          [1, 2, 3, 4, 5, 6, 7].map((n) =>
            cb(
              pipe(
                refCount,
                Ref.set(n),
                Effect.zipRight(Effect.succeed(Chunk.singleton(1)))
              )
            )
          )
        ).then(() =>
          cb(
            pipe(
              refDone,
              Ref.set(true),
              Effect.zipRight(Effect.fail(Option.none))
            )
          )
        )
        return Effect.unit()
      }, 5)
      const sink = pipe(Sink.take<number>(1), Sink.zipRight(Sink.never()))
      const fiber = yield* $(pipe(stream, Stream.run(sink), Effect.fork))
      yield* $(pipe(Ref.get(refCount), Effect.repeatWhile((n) => n !== 7)))
      const result = yield* $(Ref.get(refDone))
      yield* $(pipe(Fiber.interrupt(fiber), Effect.exit))
      assert.isFalse(result)
    }))
})
