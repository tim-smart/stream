/**
 * @since 1.0.0
 */
import type * as Cause from "@effect/io/Cause"
import type * as Effect from "@effect/io/Effect"
import type * as Exit from "@effect/io/Exit"
import * as internal from "@effect/stream/internal/take"
import type * as Chunk from "@fp-ts/data/Chunk"
import type * as Option from "@fp-ts/data/Option"

/**
 * @since 1.0.0
 * @category symbols
 */
export const TakeTypeId: unique symbol = internal.TakeTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type TakeTypeId = typeof TakeTypeId

/**
 * A `Take<E, A>` represents a single `take` from a queue modeling a stream of
 * values. A `Take` may be a failure cause `Cause<E>`, a chunk value `Chunk<A>`,
 * or an end-of-stream marker.
 *
 * @since 1.0.0
 * @category models
 */
export interface Take<E, A> extends Take.Variance<E, A> {
  /** @internal */
  readonly exit: Exit.Exit<Option.Option<E>, Chunk.Chunk<A>>
}

/**
 * @since 1.0.0
 */
export declare namespace Take {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<E, A> {
    readonly [TakeTypeId]: {
      readonly _E: (_: never) => E
      readonly _A: (_: never) => A
    }
  }
}

/**
 * Creates a `Take` with the specified chunk.
 *
 * @since 1.0.0
 * @category constructors
 */
export const chunk: <A>(chunk: Chunk.Chunk<A>) => Take<never, A> = internal.chunk

/**
 * Creates a failing `Take` with the specified defect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const die: (defect: unknown) => Take<never, never> = internal.die

/**
 * Creates a failing `Take` with the specified error message.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dieMessage: (message: string) => Take<never, never> = internal.dieMessage

/**
 * Transforms a `Take<E, A>` to an `Effect<never, E, A>`.
 *
 * @macro traced
 * @since 1.0.0
 * @category destructors
 */
export const done: <E, A>(self: Take<E, A>) => Effect.Effect<never, Option.Option<E>, Chunk.Chunk<A>> = internal.done

/**
 * Represents the end-of-stream marker.
 *
 * @since 1.0.0
 * @category constructors
 */
export const end: Take<never, never> = internal.end

/**
 * Creates a failing `Take` with the specified error.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fail: <E>(error: E) => Take<E, never> = internal.fail

/**
 * Creates a failing `Take` with the specified cause.
 *
 * @since 1.0.0
 * @category constructors
 */
export const failCause: <E>(cause: Cause.Cause<E>) => Take<E, never> = internal.failCause

/**
 * Creates an effect from `Effect<R, E, A>` that does not fail, but succeeds with
 * the `Take<E, A>`. Error from stream when pulling is converted to
 * `Take.failCause`. Creates a singleton chunk.
 *
 * @macro traced
 * @since 1.0.0
 * @category constructors
 */
export const fromEffect: <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, never, Take<E, A>> =
  internal.fromEffect

/**
 * Creates a `Take` from an `Exit`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromExit: <E, A>(exit: Exit.Exit<E, A>) => Take<E, A> = internal.fromExit

/**
 * Creates effect from `Effect<R, Option<E>, Chunk<A>>` that does not fail, but
 * succeeds with the `Take<E, A>`. Errors from stream when pulling are converted
 * to `Take.failCause`, and the end-of-stream is converted to `Take.end`.
 *
 * @macro traced
 * @since 1.0.0
 * @category constructors
 */
export const fromPull: <R, E, A>(
  pull: Effect.Effect<R, Option.Option<E>, Chunk.Chunk<A>>
) => Effect.Effect<R, never, Take<E, A>> = internal.fromPull

/**
 * Checks if this `take` is done (`Take.end`).
 *
 * @since 1.0.0
 * @category getters
 */
export const isDone: <E, A>(self: Take<E, A>) => boolean = internal.isDone

/**
 * Checks if this `take` is a failure.
 *
 * @since 1.0.0
 * @category getters
 */
export const isFailure: <E, A>(self: Take<E, A>) => boolean = internal.isFailure

/**
 * Checks if this `take` is a success.
 *
 * @since 1.0.0
 * @category getters
 */
export const isSuccess: <E, A>(self: Take<E, A>) => boolean = internal.isSuccess

/**
 * Constructs a `Take`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make: <E, A>(exit: Exit.Exit<Option.Option<E>, Chunk.Chunk<A>>) => Take<E, A> = internal.make

/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 *
 * @since 1.0.0
 * @category mapping
 */
export const map: <A, B>(f: (a: A) => B) => <E>(self: Take<E, A>) => Take<E, B> = internal.map

/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 *
 * @since 1.0.0
 * @category destructors
 */
export const match: <Z, E, A>(
  onEnd: () => Z,
  onError: (cause: Cause.Cause<E>) => Z,
  onSuccess: (value: Chunk.Chunk<A>) => Z
) => (self: Take<E, A>) => Z = internal.match

/**
 * Effectful version of `Take.fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 *
 * @macro traced
 * @since 1.0.0
 * @category destructors
 */
export const matchEffect: <R, E2, Z, R2, E, Z2, A, R3, E3, Z3>(
  onEnd: () => Effect.Effect<R, E2, Z>,
  onError: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, Z2>,
  onSuccess: (chunk: Chunk.Chunk<A>) => Effect.Effect<R3, E3, Z3>
) => (self: Take<E, A>) => Effect.Effect<R | R2 | R3, E2 | E | E3, Z | Z2 | Z3> = internal.matchEffect

/**
 * Creates a `Take` with a singleton chunk.
 *
 * @since 1.0.0
 * @category constructors
 */
export const singleton: <A>(value: A) => Take<never, A> = internal.singleton

/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 *
 * @macro traced
 * @since 1.0.0
 * @category sequencing
 */
export const tap: <A, R, E2, _>(
  f: (chunk: Chunk.Chunk<A>) => Effect.Effect<R, E2, _>
) => <E>(self: Take<E, A>) => Effect.Effect<R, E2 | E, void> = internal.tap
