/**
 * @since 1.0.0
 */
import * as internal from "@effect/stream/internal/stream/haltStrategy"

/**
 * @since 1.0.0
 * @category models
 */
export type HaltStrategy = Left | Right | Both | Either

/**
 * @since 1.0.0
 * @category models
 */
export interface Left {
  readonly op: 0
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Right {
  readonly op: 1
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Both {
  readonly op: 2
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Either {
  readonly op: 3
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const Left: HaltStrategy = internal.Left

/**
 * @since 1.0.0
 * @category constructors
 */
export const Right: HaltStrategy = internal.Right

/**
 * @since 1.0.0
 * @category constructors
 */
export const Both: HaltStrategy = internal.Both

/**
 * @since 1.0.0
 * @category constructors
 */
export const Either: HaltStrategy = internal.Either

/**
 * @since 1.0.0
 * @category refinements
 */
export const isLeft: (self: HaltStrategy) => self is Left = internal.isLeft

/**
 * @since 1.0.0
 * @category refinements
 */
export const isRight: (self: HaltStrategy) => self is Right = internal.isRight

/**
 * @since 1.0.0
 * @category refinements
 */
export const isBoth: (self: HaltStrategy) => self is Both = internal.isBoth

/**
 * @since 1.0.0
 * @category refinements
 */
export const isEither: (self: HaltStrategy) => self is Either = internal.isEither

/**
 * @since 1.0.0
 * @category folding
 */
export const match: <Z>(
  onLeft: () => Z,
  onRight: () => Z,
  onBoth: () => Z,
  onEither: () => Z
) => (self: HaltStrategy) => Z = internal.match
