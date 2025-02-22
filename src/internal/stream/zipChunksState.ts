import type * as Chunk from "@fp-ts/data/Chunk"

/** @internal */
export type ZipChunksState<A, A2> = PullBoth | PullLeft<A2> | PullRight<A>

/** @internal */
export const OP_PULL_BOTH = 0 as const

/** @internal */
export type OP_PULL_BOTH = typeof OP_PULL_BOTH

/** @internal */
export const OP_PULL_LEFT = 1 as const

/** @internal */
export type OP_PULL_LEFT = typeof OP_PULL_LEFT

/** @internal */
export const OP_PULL_RIGHT = 2 as const

/** @internal */
export type OP_PULL_RIGHT = typeof OP_PULL_RIGHT

/** @internal */
export interface PullBoth {
  readonly op: OP_PULL_BOTH
}

/** @internal */
export interface PullLeft<A> {
  readonly op: OP_PULL_LEFT
  readonly rightChunk: Chunk.Chunk<A>
}

/** @internal */
export interface PullRight<A> {
  readonly op: OP_PULL_RIGHT
  readonly leftChunk: Chunk.Chunk<A>
}

/** @internal */
export const PullBoth: ZipChunksState<never, never> = {
  op: OP_PULL_BOTH
}

/** @internal */
export const PullLeft = <A>(rightChunk: Chunk.Chunk<A>): ZipChunksState<never, A> => ({
  op: OP_PULL_LEFT,
  rightChunk
})

/** @internal */
export const PullRight = <A>(leftChunk: Chunk.Chunk<A>): ZipChunksState<A, never> => ({
  op: OP_PULL_RIGHT,
  leftChunk
})
