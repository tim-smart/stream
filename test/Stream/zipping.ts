import * as Cause from "@effect/io/Cause"
import * as Deferred from "@effect/io/Deferred"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Fiber from "@effect/io/Fiber"
import * as Queue from "@effect/io/Queue"
import * as Stream from "@effect/stream/Stream"
import * as Take from "@effect/stream/Take"
import * as it from "@effect/stream/test/utils/extend"
import * as Order from "@fp-ts/core/typeclass/Order"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Either from "@fp-ts/data/Either"
import { identity, pipe } from "@fp-ts/data/Function"
import * as Number from "@fp-ts/data/Number"
import * as Option from "@fp-ts/data/Option"
import * as fc from "fast-check"
import { assert, describe } from "vitest"

const chunkArb = <A>(
  arb: fc.Arbitrary<A>,
  constraints?: fc.ArrayConstraints
): fc.Arbitrary<Chunk.Chunk<A>> => fc.array(arb, constraints).map(Chunk.fromIterable)

const OrderByKey: Order.Order<readonly [number, number]> = pipe(
  Number.Order,
  Order.contramap((tuple) => tuple[0])
)

export const splitChunks = <A>(chunks: Chunk.Chunk<Chunk.Chunk<A>>): fc.Arbitrary<Chunk.Chunk<Chunk.Chunk<A>>> => {
  const split = (chunks: Chunk.Chunk<Chunk.Chunk<A>>): fc.Arbitrary<Chunk.Chunk<Chunk.Chunk<A>>> =>
    fc.integer({ min: 0, max: Math.max(chunks.length - 1, 0) }).chain((i) => {
      const chunk = chunks.unsafeGet(i)
      return fc.integer({ min: 0, max: Math.max(chunk.length - 1, 0) }).map((j) => {
        const [left, right] = pipe(chunk, Chunk.splitAt(j))
        return pipe(
          chunks,
          Chunk.take(i),
          Chunk.concat(Chunk.singleton(left)),
          Chunk.concat(Chunk.singleton(right)),
          Chunk.concat(pipe(chunks, Chunk.drop(i + 1)))
        )
      })
    })
  return fc.oneof(fc.constant(chunks), split(chunks).chain((chunks) => splitChunks(chunks)))
}

describe.concurrent("Stream", () => {
  it.it("zipAllSortedByKeyWith", () => {
    const intArb = fc.integer({ min: 1, max: 100 })
    const chunkArb = fc.array(fc.tuple(intArb, intArb)).map((entries) =>
      pipe(Chunk.fromIterable(entries), Chunk.sort(OrderByKey))
    )
    const chunksArb = chunkArb.chain((chunk) => splitChunks(Chunk.singleton(chunk)))
    fc.asyncProperty(chunksArb, chunksArb, async (as, bs) => {
      const left = Stream.fromChunks(...as)
      const right = Stream.fromChunks(...bs)
      const actual = pipe(
        left,
        Stream.zipAllSortedByKeyWith(Number.Order)(
          right,
          identity,
          identity,
          (x, y) => x + y
        )
      )
      const expected = pipe(
        Chunk.flatten(as),
        Chunk.reduce(new Map(Array.from(Chunk.flatten(bs))), (map, [k, v]) =>
          pipe(
            Option.fromNullable(map.get(k)),
            Option.match(
              () => map.set(k, v),
              (v1) => map.set(k, v + v1)
            )
          )),
        Chunk.fromIterable,
        Chunk.sort(OrderByKey)
      )
      const result = await Effect.unsafeRunPromise(Stream.runCollect(actual))
      assert.deepStrictEqual(Array.from(result), Array.from(expected))
    })
  })

  it.effect("zip - does not pull too much when one of the streams is done", () =>
    Effect.gen(function*($) {
      const left = pipe(
        Stream.fromChunks(Chunk.make(1, 2), Chunk.make(3, 4), Chunk.singleton(5)),
        Stream.concat(Stream.fail("boom"))
      )
      const right = Stream.fromChunks(Chunk.make("a", "b"), Chunk.singleton("c"))
      const result = yield* $(pipe(left, Stream.zip(right), Stream.runCollect))
      assert.deepStrictEqual(Array.from(result), [[1, "a"], [2, "b"], [3, "c"]])
    }))

  it.it("zip - equivalence with Chunk.zip", () => {
    fc.asyncProperty(fc.array(chunkArb(fc.integer())), fc.array(chunkArb(fc.integer())), async (left, right) => {
      const stream = pipe(
        Stream.fromChunks(...left),
        Stream.zip(Stream.fromChunks(...right))
      )
      const expected = pipe(
        Chunk.flatten(Chunk.fromIterable(left)),
        Chunk.zip(Chunk.flatten(Chunk.fromIterable(right)))
      )
      const actual = await Effect.unsafeRunPromise(Stream.runCollect(stream))
      assert.deepStrictEqual(Array.from(actual), Array.from(expected))
    })
  })

  it.effect("zipWith - prioritizes failures", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.never(),
        Stream.zipWith(Stream.fail("Ouch"), () => Option.none),
        Stream.runCollect,
        Effect.either
      ))
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("zipWith - dies if one of the streams throws an exception", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1),
        Stream.flatMap(() =>
          Stream.sync(() => {
            throw Cause.RuntimeException("Ouch")
          })
        ),
        Stream.zip(Stream.make(1)),
        Stream.runCollect,
        Effect.exit
      ))
      assert.deepStrictEqual(
        Exit.unannotate(result),
        Exit.failCause(Cause.parallel(Cause.empty, Cause.die(Cause.RuntimeException("Ouch"))))
      )
    }))

  it.it("zipAllWith", () => {
    fc.asyncProperty(
      fc.array(chunkArb(fc.integer())).filter((array) => array.length > 0),
      fc.array(chunkArb(fc.integer())).filter((array) => array.length > 0),
      async (left, right) => {
        const stream = pipe(
          Stream.fromChunks(...left),
          Stream.map(Option.some),
          Stream.zipAll(
            pipe(Stream.fromChunks(...right), Stream.map(Option.some)),
            Option.none as Option.Option<number>,
            Option.none as Option.Option<number>
          )
        )
        const actual = await Effect.unsafeRunPromise(Stream.runCollect(stream))
        const expected = pipe(
          Chunk.flatten(Chunk.fromIterable(left)),
          Chunk.zipAllWith(
            Chunk.flatten(Chunk.fromIterable(right)),
            (a, b) => [Option.some(a), Option.some(b)] as const,
            (a) => [Option.some(a), Option.none] as const,
            (b) => [Option.none, Option.some(b)] as const
          )
        )
        assert.deepStrictEqual(Array.from(actual), Array.from(expected))
      }
    )
  })

  it.effect("zipAll - prioritizes failures", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.never(),
        Stream.zipAll(Stream.fail("Ouch"), Option.none, Option.none),
        Stream.runCollect,
        Effect.either
      ))
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("zipWithIndex", () =>
    Effect.gen(function*($) {
      const stream = Stream.make(1, 2, 3, 4, 5)
      const { result1, result2 } = yield* $(Effect.struct({
        result1: Stream.runCollect(Stream.zipWithIndex(stream)),
        result2: pipe(Stream.runCollect(stream), Effect.map(Chunk.zipWithIndex))
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    }))

  it.effect("zipLatest", () =>
    Effect.gen(function*($) {
      const left = yield* $(Queue.unbounded<Chunk.Chunk<number>>())
      const right = yield* $(Queue.unbounded<Chunk.Chunk<number>>())
      const output = yield* $(Queue.bounded<Take.Take<never, readonly [number, number]>>(1))
      yield* $(pipe(
        Stream.fromChunkQueue(left),
        Stream.zipLatest(Stream.fromChunkQueue(right)),
        Stream.runIntoQueue(output),
        Effect.fork
      ))
      yield* $(pipe(left, Queue.offer(Chunk.make(0))))
      yield* $(pipe(right, Queue.offerAll([Chunk.make(0), Chunk.make(1)])))
      const chunk1 = yield* $(pipe(
        Queue.take(output),
        Effect.flatMap(Take.done),
        Effect.replicateEffect(2),
        Effect.map(Chunk.flatten)
      ))
      yield* $(pipe(left, Queue.offerAll([Chunk.make(1), Chunk.make(2)])))
      const chunk2 = yield* $(pipe(
        Queue.take(output),
        Effect.flatMap(Take.done),
        Effect.replicateEffect(2),
        Effect.map(Chunk.flatten)
      ))
      assert.deepStrictEqual(Array.from(chunk1), [[0, 0], [0, 1]])
      assert.deepStrictEqual(Array.from(chunk2), [[1, 1], [2, 1]])
    }))

  it.effect("zipLatestWith - handles empty pulls properly", () =>
    Effect.gen(function*($) {
      const stream0 = Stream.fromChunks(
        Chunk.empty<number>(),
        Chunk.empty<number>(),
        Chunk.make(2)
      )
      const stream1 = Stream.fromChunks(Chunk.make(1), Chunk.make(1))
      const deferred = yield* $(Deferred.make<never, number>())
      const latch = yield* $(Deferred.make<never, void>())
      const fiber = yield* $(pipe(
        stream0,
        Stream.concat(Stream.fromEffect(Deferred.await(deferred))),
        Stream.concat(Stream.make(2)),
        Stream.zipLatestWith(
          pipe(
            Stream.make(1, 1),
            Stream.ensuring(pipe(latch, Deferred.succeed<void>(void 0))),
            Stream.concat(stream1)
          ),
          (_, n) => n
        ),
        Stream.take(3),
        Stream.runCollect,
        Effect.fork
      ))
      yield* $(Deferred.await(latch))
      yield* $(pipe(deferred, Deferred.succeed(2)))
      const result = yield* $(Fiber.join(fiber))
      assert.deepStrictEqual(Array.from(result), [1, 1, 1])
    }))

  it.effect("zipLatestWith - handles empty pulls properly (JVM Only - LOL)", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.unfold(0, (n) =>
          Option.some(
            [
              n < 3 ? Chunk.empty<number>() : Chunk.singleton(2),
              n + 1
            ] as const
          )),
        Stream.flattenChunks,
        Stream.forever,
        Stream.zipLatestWith(Stream.forever(Stream.make(1)), (_, n) => n),
        Stream.take(3),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [1, 1, 1])
    }))

  it.it("zipLatestWith - preserves partial ordering of stream elements", () => {
    const sortedChunkArb = chunkArb(fc.integer({ min: 1, max: 100 })).map(Chunk.sort(Number.Order))
    const sortedChunksArb = sortedChunkArb.chain((chunk) => splitChunks(Chunk.singleton(chunk)))
    fc.asyncProperty(sortedChunksArb, sortedChunksArb, async (left, right) => {
      const stream = pipe(
        Stream.fromChunks(...left),
        Stream.zipLatestWith(Stream.fromChunks(...right), (l, r) => l + r)
      )
      const result = await Effect.unsafeRunPromise(Stream.runCollect(stream))
      const [isSorted] = pipe(
        result,
        Chunk.drop(1),
        Chunk.reduce(
          [true as boolean, pipe(result, Chunk.unsafeGet(0))] as const,
          ([isSorted, last], curr) => [isSorted && last <= curr, curr] as const
        )
      )
      assert.isTrue(isSorted)
    })
  })

  it.effect("zipWithNext", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1, 2, 3),
        Stream.zipWithNext,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [
        [1, Option.some(2)],
        [2, Option.some(3)],
        [3, Option.none]
      ])
    }))

  it.effect("zipWithNext - should work with multiple chunks", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.fromChunks(Chunk.singleton(1), Chunk.singleton(2), Chunk.singleton(3)),
        Stream.zipWithNext,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [
        [1, Option.some(2)],
        [2, Option.some(3)],
        [3, Option.none]
      ])
    }))

  it.effect("zipWithNext - should work with an empty stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.empty,
        Stream.zipWithNext,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [])
    }))

  it.it("zipWithNext - should output the same values as zipping with the tail plus the last element", () => {
    fc.asyncProperty(fc.array(chunkArb(fc.integer())), async (chunks) => {
      const stream = Stream.fromChunks(...chunks)
      const { result1, result2 } = await Effect.unsafeRunPromise(Effect.struct({
        result1: pipe(
          stream,
          Stream.zipWithNext,
          Stream.runCollect
        ),
        result2: pipe(
          stream,
          Stream.zipAll(pipe(stream, Stream.drop(1), Stream.map(Option.some)), 0, Option.none),
          Stream.runCollect
        )
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    })
  })

  it.effect("zipWithPrevious - should zip with previous element for a single chunk", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1, 2, 3),
        Stream.zipWithPrevious,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [
        [Option.none, 1],
        [Option.some(1), 2],
        [Option.some(2), 3]
      ])
    }))

  it.effect("zipWithPrevious - should work with multiple chunks", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.fromChunks(Chunk.singleton(1), Chunk.singleton(2), Chunk.singleton(3)),
        Stream.zipWithPrevious,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [
        [Option.none, 1],
        [Option.some(1), 2],
        [Option.some(2), 3]
      ])
    }))

  it.effect("zipWithPrevious - should work with an empty stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.empty,
        Stream.zipWithPrevious,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [])
    }))

  it.it("zipWithPrevious - should output same values as first element plus zipping with init", () => {
    fc.asyncProperty(fc.array(chunkArb(fc.integer())), async (chunks) => {
      const stream = Stream.fromChunks(...chunks)
      const { result1, result2 } = await Effect.unsafeRunPromise(Effect.struct({
        result1: pipe(
          stream,
          Stream.zipWithPrevious,
          Stream.runCollect
        ),
        result2: pipe(
          Stream.make(Option.none),
          Stream.concat(pipe(stream, Stream.map(Option.some), Stream.zip(stream))),
          Stream.runCollect
        )
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    })
  })

  it.effect("zipWithPreviousAndNext", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1, 2, 3),
        Stream.zipWithPreviousAndNext,
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result), [
        [Option.none, 1, Option.some(2)],
        [Option.some(1), 2, Option.some(3)],
        [Option.some(2), 3, Option.none]
      ])
    }))

  it.it("zipWithPreviousAndNext - should output same values as zipping with both previous and next element", () => {
    fc.asyncProperty(fc.array(chunkArb(fc.integer())), async (chunks) => {
      const stream = Stream.fromChunks(...chunks)
      const { result1, result2 } = await Effect.unsafeRunPromise(Effect.struct({
        result1: pipe(
          stream,
          Stream.zipWithPreviousAndNext,
          Stream.runCollect
        ),
        result2: pipe(
          Stream.make(Option.none),
          Stream.concat(pipe(stream, Stream.map(Option.some))),
          Stream.zip(stream),
          Stream.zip(
            pipe(
              stream,
              Stream.drop(1),
              Stream.map(Option.some),
              Stream.concat(Stream.make(Option.none))
            )
          ),
          Stream.map(([[previous, current], next]) =>
            [
              previous as Option.Option<number>,
              current,
              next as Option.Option<number>
            ] as const
          ),
          Stream.runCollect
        )
      }))
      assert.deepStrictEqual(Array.from(result1), Array.from(result2))
    })
  })
})
