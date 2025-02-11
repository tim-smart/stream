/**
 * @since 1.0.0
 */
import * as internal from "@effect/stream/internal/channel/upstreamPullStrategy"
import type * as Option from "@fp-ts/data/Option"

/**
 * @since 1.0.0
 * @category symbols
 */
export const UpstreamPullStrategyTypeId: unique symbol = internal.UpstreamPullStrategyTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type UpstreamPullStrategyTypeId = typeof UpstreamPullStrategyTypeId

/**
 * @since 1.0.0
 * @category models
 */
export type UpstreamPullStrategy<A> = PullAfterNext<A> | PullAfterAllEnqueued<A>

/**
 * @since 1.0.0
 */
export declare namespace UpstreamPullStrategy {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Variance<A> {
    readonly [UpstreamPullStrategyTypeId]: {
      readonly _A: (_: never) => A
    }
  }
}

/**
 * @since 1.0.0
 * @category models
 */
export interface PullAfterNext<A> extends UpstreamPullStrategy.Variance<A> {
  readonly op: 0
  readonly emitSeparator: Option.Option<A>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface PullAfterAllEnqueued<A> extends UpstreamPullStrategy.Variance<A> {
  readonly op: 1
  readonly emitSeparator: Option.Option<A>
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const PullAfterNext: <A>(emitSeparator: Option.Option<A>) => UpstreamPullStrategy<A> = internal.PullAfterNext

/**
 * @since 1.0.0
 * @category constructors
 */
export const PullAfterAllEnqueued: <A>(emitSeparator: Option.Option<A>) => UpstreamPullStrategy<A> =
  internal.PullAfterAllEnqueued

/**
 * Returns `true` if the specified value is an `UpstreamPullStrategy`, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isUpstreamPullStrategy: (u: unknown) => u is UpstreamPullStrategy<unknown> =
  internal.isUpstreamPullStrategy

/**
 * Returns `true` if the specified `UpstreamPullStrategy` is a `PullAfterNext`,
 * `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isPullAfterNext: <A>(self: UpstreamPullStrategy<A>) => self is PullAfterNext<A> = internal.isPullAfterNext

/**
 * Returns `true` if the specified `UpstreamPullStrategy` is a
 * `PullAfterAllEnqueued`, `false` otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
export const isPullAfterAllEnqueued: <A>(self: UpstreamPullStrategy<A>) => self is PullAfterAllEnqueued<A> =
  internal.isPullAfterAllEnqueued

/**
 * Folds an `UpstreamPullStrategy<A>` into a value of type `Z`.
 *
 * @since 1.0.0
 * @category folding
 */
export const match: <A, Z>(
  onPullAfterNext: (emitSeparator: Option.Option<A>) => Z,
  onPullAfterAllEnqueued: (emitSeparator: Option.Option<A>) => Z
) => (self: UpstreamPullStrategy<A>) => Z = internal.match
