import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as Queue from "@effect/io/Queue"
import * as Stream from "@effect/stream/Stream"
import * as it from "@effect/stream/test/utils/extend"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Duration from "@fp-ts/data/Duration"
import * as Either from "@fp-ts/data/Either"
import { constVoid, pipe } from "@fp-ts/data/Function"
import * as HashSet from "@fp-ts/data/HashSet"
import { assert, describe } from "vitest"

describe.concurrent("Stream", () => {
  it.effect("mergeAll - short circuiting", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.mergeAll(2)(Stream.never(), Stream.make(1)),
        Stream.take(1),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [1])
    }))

  // TODO(Mike/Max): swap out with TestClock after `@effect/test`
  it.effect("mergeHaltLeft - terminates as soon as the first stream terminates", () =>
    Effect.gen(function*($) {
      const queue1 = yield* $(Queue.unbounded<number>())
      const queue2 = yield* $(Queue.unbounded<number>())
      const stream1 = Stream.fromQueue(queue1)
      const stream2 = Stream.fromQueue(queue2)
      const fiber = yield* $(pipe(
        stream1,
        Stream.mergeHaltLeft(stream2),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(pipe(queue1, Queue.offer(1), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(queue1, Queue.offer(2), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(Queue.shutdown(queue1), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(queue2, Queue.offer(3)))
      const result = yield* $(Fiber.join(fiber))
      assert.deepStrictEqual(Array.from(result), [1, 2])
    }))

  // TODO(Mike/Max): swap out with TestClock after `@effect/test`
  it.effect("mergeHaltEither - interrupts pulling on finish", () =>
    Effect.gen(function*($) {
      const stream1 = Stream.make(1, 2, 3)
      const stream2 = Stream.fromEffect(pipe(Effect.sleep(Duration.millis(10)), Effect.as(4)))
      const result = yield* $(pipe(
        stream1,
        Stream.mergeHaltLeft(stream2),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [1, 2, 3])
    }))

  // TODO(Mike/Max): swap out with TestClock after `@effect/test`
  it.effect("mergeHaltRight - terminates as soon as the second stream terminates", () =>
    Effect.gen(function*($) {
      const queue1 = yield* $(Queue.unbounded<number>())
      const queue2 = yield* $(Queue.unbounded<number>())
      const stream1 = Stream.fromQueue(queue1)
      const stream2 = Stream.fromQueue(queue2)
      const fiber = yield* $(pipe(
        stream1,
        Stream.mergeHaltRight(stream2),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(pipe(queue2, Queue.offer(1), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(queue2, Queue.offer(2), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(Queue.shutdown(queue2), Effect.zipRight(Effect.sleep(Duration.millis(10)))))
      yield* $(pipe(queue1, Queue.offer(3)))
      const result = yield* $(Fiber.join(fiber))
      assert.deepStrictEqual(Array.from(result), [1, 2])
    }))

  // TODO(Mike/Max): swap out with TestClock after `@effect/test`
  it.effect("mergeHaltEither - terminates as soon as either stream terminates", () =>
    Effect.gen(function*($) {
      const queue1 = yield* $(Queue.unbounded<number>())
      const queue2 = yield* $(Queue.unbounded<number>())
      const stream1 = Stream.fromQueue(queue1)
      const stream2 = Stream.fromQueue(queue2)
      const fiber = yield* $(pipe(
        stream1,
        Stream.mergeHaltEither(stream2),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(Queue.shutdown(queue1))
      yield* $(Effect.sleep(Duration.millis(10)))
      yield* $(pipe(queue2, Queue.offer(1)))
      const result = yield* $(Fiber.join(fiber))
      assert.isTrue(Chunk.isEmpty(result))
    }))

  it.effect("merge - equivalence with set union", () =>
    Effect.gen(function*($) {
      const stream1 = Stream.make(1, 2, 3, 4)
      const stream2 = Stream.make(5, 6, 7, 8)
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(
          stream1,
          Stream.merge(stream2),
          Stream.runCollect,
          Effect.map(HashSet.from)
        ),
        result2: pipe(
          Stream.runCollect(stream1),
          Effect.zipWith(
            Stream.runCollect(stream2),
            (chunk1, chunk2) => pipe(chunk1, Chunk.concat(chunk2))
          ),
          Effect.map(HashSet.from)
        )
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("merge - fails as soon as one stream fails", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1, 2, 3),
        Stream.merge(Stream.fail(void 0)),
        Stream.runCollect,
        Effect.exit
      ))
      assert.isTrue(Exit.isFailure(result))
    }))

  it.effect("mergeWith - prioritizes failures", () =>
    Effect.gen(function*($) {
      const stream1 = Stream.never()
      const stream2 = Stream.fail("Ouch")
      const result = yield* $(pipe(
        stream1,
        Stream.mergeWith(stream2, constVoid, constVoid),
        Stream.runCollect,
        Effect.either
      ))
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))
})
