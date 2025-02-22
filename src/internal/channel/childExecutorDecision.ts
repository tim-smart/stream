import type * as ChildExecutorDecision from "@effect/stream/Channel/ChildExecutorDecision"
import * as OpCodes from "@effect/stream/internal/opCodes/childExecutorDecision"

/** @internal */
const ChildExecutorDecisionSymbolKey = "@effect/stream/Channel/ChildExecutorDecision"

/** @internal */
export const ChildExecutorDecisionTypeId: ChildExecutorDecision.ChildExecutorDecisionTypeId = Symbol.for(
  ChildExecutorDecisionSymbolKey
) as ChildExecutorDecision.ChildExecutorDecisionTypeId

/** @internal */
const proto = {
  [ChildExecutorDecisionTypeId]: ChildExecutorDecisionTypeId
}

/** @internal */
export const Continue: ChildExecutorDecision.ChildExecutorDecision = Object.create(proto, {
  op: {
    value: OpCodes.OP_CONTINUE,
    enumerable: true
  }
})

/** @internal */
export const Close = (value: unknown): ChildExecutorDecision.ChildExecutorDecision =>
  Object.create(proto, {
    op: {
      value: OpCodes.OP_CLOSE,
      enumerable: true
    },
    value: {
      value,
      enumerable: true
    }
  })

/** @internal */
export const Yield: ChildExecutorDecision.ChildExecutorDecision = Object.create(proto, {
  "op": {
    value: OpCodes.OP_YIELD,
    enumerable: true
  }
})

/** @internal */
export const isChildExecutorDecision = (u: unknown): u is ChildExecutorDecision.ChildExecutorDecision => {
  return typeof u === "object" && u != null && ChildExecutorDecisionTypeId in u
}

/** @internal */
export const isContinue = (
  self: ChildExecutorDecision.ChildExecutorDecision
): self is ChildExecutorDecision.Continue => {
  return self.op === OpCodes.OP_CONTINUE
}

/** @internal */
export const isClose = (
  self: ChildExecutorDecision.ChildExecutorDecision
): self is ChildExecutorDecision.Close => {
  return self.op === OpCodes.OP_CLOSE
}

/** @internal */
export const isYield = (
  self: ChildExecutorDecision.ChildExecutorDecision
): self is ChildExecutorDecision.Yield => {
  return self.op === OpCodes.OP_YIELD
}

/** @internal */
export const match = <A>(
  onContinue: () => A,
  onClose: (value: unknown) => A,
  onYield: () => A
) => {
  return (self: ChildExecutorDecision.ChildExecutorDecision): A => {
    switch (self.op) {
      case OpCodes.OP_CONTINUE: {
        return onContinue()
      }
      case OpCodes.OP_CLOSE: {
        return onClose(self.value)
      }
      case OpCodes.OP_YIELD: {
        return onYield()
      }
    }
  }
}
