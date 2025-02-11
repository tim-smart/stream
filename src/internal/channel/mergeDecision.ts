import type * as Effect from "@effect/io/Effect"
import type * as Exit from "@effect/io/Exit"
import type * as MergeDecision from "@effect/stream/Channel/MergeDecision"
import * as OpCodes from "@effect/stream/internal/opCodes/mergeDecision"

/** @internal */
const MergeDecisionSymbolKey = "@effect/stream/Channel/MergeDecision"

/** @internal */
export const MergeDecisionTypeId: MergeDecision.MergeDecisionTypeId = Symbol.for(
  MergeDecisionSymbolKey
) as MergeDecision.MergeDecisionTypeId

/** @internal */
const proto = {
  [MergeDecisionTypeId]: {
    _R: (_: never) => _,
    _E0: (_: unknown) => _,
    _Z0: (_: unknown) => _,
    _E: (_: never) => _,
    _Z: (_: never) => _
  }
}

/** @internal */
export type Primitive =
  | Done
  | Await

/** @internal */
export type Op<OpCode extends number, Body = {}> =
  & MergeDecision.MergeDecision<never, unknown, unknown, never, never>
  & Body
  & {
    readonly op: OpCode
  }

/** @internal */
export interface Done extends
  Op<OpCodes.OP_DONE, {
    readonly effect: Effect.Effect<never, never, never>
  }>
{}

/** @internal */
export interface Await extends
  Op<OpCodes.OP_AWAIT, {
    readonly f: (exit: Exit.Exit<unknown, unknown>) => Effect.Effect<never, never, never>
  }>
{}

/** @internal */
export const Done = <R, E, Z>(effect: Effect.Effect<R, E, Z>): MergeDecision.MergeDecision<R, unknown, unknown, E, Z> =>
  Object.create(proto, {
    op: {
      value: OpCodes.OP_DONE,
      enumerable: true
    },
    effect: {
      value: effect,
      enumerable: true
    }
  })

/** @internal */
export const Await = <R, E0, Z0, E, Z>(
  f: (exit: Exit.Exit<E0, Z0>) => Effect.Effect<R, E, Z>
): MergeDecision.MergeDecision<R, E0, Z0, E, Z> =>
  Object.create(proto, {
    op: {
      value: OpCodes.OP_AWAIT,
      enumerable: true
    },
    f: {
      value: f,
      enumerable: true
    }
  })

/** @internal */
export const AwaitConst = <R, E, Z>(
  effect: Effect.Effect<R, E, Z>
): MergeDecision.MergeDecision<R, unknown, unknown, E, Z> => Await(() => effect)

/** @internal */
export const isMergeDecision = (
  u: unknown
): u is MergeDecision.MergeDecision<unknown, unknown, unknown, unknown, unknown> => {
  return typeof u === "object" && u != null && MergeDecisionTypeId in u
}

/** @internal */
export const match = <R, E0, Z0, E, Z, Z2>(
  onDone: (effect: Effect.Effect<R, E, Z>) => Z2,
  onAwait: (f: (exit: Exit.Exit<E0, Z0>) => Effect.Effect<R, E, Z>) => Z2
) => {
  return (self: MergeDecision.MergeDecision<R, E0, Z0, E, Z>): Z2 => {
    const op = self as Primitive
    switch (op.op) {
      case OpCodes.OP_DONE: {
        return onDone(op.effect)
      }
      case OpCodes.OP_AWAIT: {
        return onAwait(op.f)
      }
    }
  }
}
