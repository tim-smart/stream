import * as Effect from "@effect/io/Effect"
import * as Ref from "@effect/io/Ref"
import * as Stream from "@effect/stream/Stream"
import * as it from "@effect/stream/test/utils/extend"
import * as Chunk from "@fp-ts/data/Chunk"
import * as Either from "@fp-ts/data/Either"
import { pipe } from "@fp-ts/data/Function"
import { assert, describe } from "vitest"

describe.concurrent("Stream", () => {
  it.effect("sliding - returns a sliding window", () =>
    Effect.gen(function*($) {
      const stream0 = Stream.fromChunks(
        Chunk.empty<number>(),
        Chunk.make(1),
        Chunk.empty<number>(),
        Chunk.make(2, 3, 4, 5)
      )
      const stream1 = pipe(
        Stream.empty,
        Stream.concat(Stream.make(1)),
        Stream.concat(Stream.empty),
        Stream.concat(Stream.make(2)),
        Stream.concat(Stream.make(3, 4, 5))
      )
      const stream2 = pipe(
        Stream.make(1),
        Stream.concat(Stream.empty),
        Stream.concat(Stream.make(2)),
        Stream.concat(Stream.empty),
        Stream.concat(Stream.make(3, 4, 5))
      )
      const stream3 = pipe(
        Stream.fromChunk(Chunk.make(1)),
        Stream.concat(Stream.fromChunk(Chunk.make(2))),
        Stream.concat(Stream.make(3, 4, 5))
      )
      const result1 = yield* $(pipe(
        Stream.make(1, 2, 3, 4, 5),
        Stream.sliding(2),
        Stream.runCollect
      ))
      const result2 = yield* $(pipe(
        stream0,
        Stream.sliding(2),
        Stream.runCollect
      ))
      const result3 = yield* $(pipe(
        stream1,
        Stream.sliding(2),
        Stream.runCollect
      ))
      const result4 = yield* $(pipe(
        stream2,
        Stream.sliding(2),
        Stream.runCollect
      ))
      const result5 = yield* $(pipe(
        stream3,
        Stream.sliding(2),
        Stream.runCollect
      ))
      const expected = [[1, 2], [2, 3], [3, 4], [4, 5]]
      assert.deepStrictEqual(Array.from(result1).map((chunk) => Array.from(chunk)), expected)
      assert.deepStrictEqual(Array.from(result2).map((chunk) => Array.from(chunk)), expected)
      assert.deepStrictEqual(Array.from(result3).map((chunk) => Array.from(chunk)), expected)
      assert.deepStrictEqual(Array.from(result4).map((chunk) => Array.from(chunk)), expected)
      assert.deepStrictEqual(Array.from(result5).map((chunk) => Array.from(chunk)), expected)
    }))

  it.effect("sliding - returns all elements if chunkSize is greater than the size of the stream", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.range(1, 6),
        Stream.sliding(6),
        Stream.runCollect
      ))
      assert.deepStrictEqual(Array.from(result).map((chunk) => Array.from(chunk)), [[1, 2, 3, 4, 5]])
    }))

  it.effect("sliding - is mostly equivalent to ZStream#grouped when stepSize and chunkSize are equal", () =>
    Effect.gen(function*($) {
      const stream = Stream.range(1, 6)
      const { result1, result2 } = yield* $(Effect.struct({
        result1: pipe(stream, Stream.sliding(3, 3), Stream.runCollect),
        result2: pipe(stream, Stream.grouped(3), Stream.runCollect)
      }))
      assert.deepStrictEqual(
        Array.from(result1).map((chunk) => Array.from(chunk)),
        Array.from(result2).map((chunk) => Array.from(chunk))
      )
    }))

  it.effect("sliding - fails if upstream produces an error", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(
        Stream.make(1, 2, 3),
        Stream.concat(Stream.fail("Ouch")),
        Stream.concat(Stream.make(4, 5)),
        Stream.sliding(2),
        Stream.runCollect,
        Effect.either
      ))
      assert.deepStrictEqual(result, Either.left("Ouch"))
    }))

  it.effect("sliding - should return an empty chunk when the stream is empty", () =>
    Effect.gen(function*($) {
      const result = yield* $(pipe(Stream.empty, Stream.sliding(2), Stream.runCollect))
      assert.deepStrictEqual(Array.from(result), [])
    }))

  it.effect("sliding - emits elements properly when a failure occurs", () =>
    Effect.gen(function*($) {
      const ref = yield* $(Ref.make(Chunk.empty<Chunk.Chunk<number>>()))
      const streamChunks = Stream.fromChunks(
        Chunk.range(1, 4),
        Chunk.range(5, 7),
        Chunk.singleton(8)
      )
      const stream = pipe(
        streamChunks,
        Stream.concat(Stream.fail("Ouch")),
        Stream.sliding(3, 3)
      )
      const either = yield* $(pipe(
        stream,
        Stream.mapEffect((chunk) => pipe(ref, Ref.update(Chunk.append(chunk)))),
        Stream.runCollect,
        Effect.either
      ))
      const result = yield* $(Ref.get(ref))
      assert.deepStrictEqual(either, Either.left("Ouch"))
      assert.deepStrictEqual(
        Array.from(result).map((chunk) => Array.from(chunk)),
        [[1, 2, 3], [4, 5, 6], [7, 8]]
      )
    }))
})
