/**
 * @since 1.0.0
 */
import type * as Effect from "@effect/io/Effect"
import type * as Exit from "@effect/io/Exit"
import type * as Fiber from "@effect/io/Fiber"
import * as internal from "@effect/stream/internal/channel/mergeState"
import type * as Either from "@fp-ts/data/Either"

/**
 * @since 1.0.0
 * @category symbols
 */
export const MergeStateTypeId: unique symbol = internal.MergeStateTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type MergeStateTypeId = typeof MergeStateTypeId

/**
 * @since 1.0.0
 * @category models
 */
export type MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> =
  | BothRunning<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>
  | LeftDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>
  | RightDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>

/**
 * @since 1.0.0
 */
export declare namespace MergeState {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Proto {
    readonly [MergeStateTypeId]: MergeStateTypeId
  }
}

/**
 * @since 1.0.0
 * @category models
 */
export interface BothRunning<_Env, Err, Err1, _Err2, Elem, Done, Done1, _Done2> extends MergeState.Proto {
  readonly op: 0
  readonly left: Fiber.Fiber<Err, Either.Either<Done, Elem>>
  readonly right: Fiber.Fiber<Err1, Either.Either<Done1, Elem>>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface LeftDone<Env, _Err, Err1, Err2, _Elem, _Done, Done1, Done2> extends MergeState.Proto {
  readonly op: 1
  readonly f: (exit: Exit.Exit<Err1, Done1>) => Effect.Effect<Env, Err2, Done2>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface RightDone<Env, Err, _Err1, Err2, _Elem, Done, _Done1, Done2> extends MergeState.Proto {
  readonly op: 2
  readonly f: (exit: Exit.Exit<Err, Done>) => Effect.Effect<Env, Err2, Done2>
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const BothRunning: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  left: Fiber.Fiber<Err, Either.Either<Done, Elem>>,
  right: Fiber.Fiber<Err1, Either.Either<Done1, Elem>>
) => MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.BothRunning

/**
 * @since 1.0.0
 * @category constructors
 */
export const LeftDone: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  f: (exit: Exit.Exit<Err1, Done1>) => Effect.Effect<Env, Err2, Done2>
) => MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.LeftDone

/**
 * @since 1.0.0
 * @category constructors
 */
export const RightDone: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  f: (exit: Exit.Exit<Err, Done>) => Effect.Effect<Env, Err2, Done2>
) => MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.RightDone

/**
 * Returns `true` if the specified value is a `MergeState`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isMergeState: (
  u: unknown
) => u is MergeState<unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown> = internal.isMergeState

/**
 * Returns `true` if the specified `MergeState` is a `BothRunning`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isBothRunning: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  self: MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>
) => self is BothRunning<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.isBothRunning

/**
 * Returns `true` if the specified `MergeState` is a `LeftDone`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isLeftDone: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  self: MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>
) => self is LeftDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.isLeftDone

/**
 * Returns `true` if the specified `MergeState` is a `RightDone`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isRightDone: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2>(
  self: MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>
) => self is RightDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = internal.isRightDone

/**
 * @since 1.0.0
 * @category folding
 */
export const match: <Env, Err, Err1, Err2, Elem, Done, Done1, Done2, Z>(
  onBothRunning: (
    left: Fiber.Fiber<Err, Either.Either<Done, Elem>>,
    right: Fiber.Fiber<Err1, Either.Either<Done1, Elem>>
  ) => Z,
  onLeftDone: (
    f: (exit: Exit.Exit<Err1, Done1>) => Effect.Effect<Env, Err2, Done2>
  ) => Z,
  onRightDone: (
    f: (exit: Exit.Exit<Err, Done>) => Effect.Effect<Env, Err2, Done2>
  ) => Z
) => (self: MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>) => Z = internal.match
