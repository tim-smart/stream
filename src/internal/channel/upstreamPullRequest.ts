import type * as UpstreamPullRequest from "@effect/stream/Channel/UpstreamPullRequest"
import * as OpCodes from "@effect/stream/internal/opCodes/upstreamPullRequest"

/** @internal */
const UpstreamPullRequestSymbolKey = "@effect/stream/Channel/UpstreamPullRequest"

/** @internal */
export const UpstreamPullRequestTypeId: UpstreamPullRequest.UpstreamPullRequestTypeId = Symbol.for(
  UpstreamPullRequestSymbolKey
) as UpstreamPullRequest.UpstreamPullRequestTypeId

/** @internal */
const upstreamPullRequestVariance = {
  _A: (_: never) => _
}

/** @internal */
const proto = {
  [UpstreamPullRequestTypeId]: upstreamPullRequestVariance
}

/** @internal */
export const Pulled = <A>(value: A): UpstreamPullRequest.UpstreamPullRequest<A> =>
  Object.create(proto, {
    op: {
      value: OpCodes.OP_PULLED,
      enumerable: true
    },
    value: {
      value,
      enumerable: true
    }
  })

/** @internal */
export const NoUpstream = (activeDownstreamCount: number): UpstreamPullRequest.UpstreamPullRequest<never> =>
  Object.create(proto, {
    op: {
      value: OpCodes.OP_NO_UPSTREAM,
      enumerable: true
    },
    activeDownstreamCount: {
      value: activeDownstreamCount,
      enumerable: true
    }
  })

/** @internal */
export const isUpstreamPullRequest = (u: unknown): u is UpstreamPullRequest.UpstreamPullRequest<unknown> => {
  return typeof u === "object" && u != null && UpstreamPullRequestTypeId in u
}

/** @internal */
export const isPulled = <A>(
  self: UpstreamPullRequest.UpstreamPullRequest<A>
): self is UpstreamPullRequest.Pulled<A> => {
  return self.op === OpCodes.OP_PULLED
}

/** @internal */
export const isNoUpstream = <A>(
  self: UpstreamPullRequest.UpstreamPullRequest<A>
): self is UpstreamPullRequest.NoUpstream => {
  return self.op === OpCodes.OP_NO_UPSTREAM
}

/** @internal */
export const match = <A, Z>(
  onPulled: (value: A) => Z,
  onNoUpstream: () => Z
) => {
  return (self: UpstreamPullRequest.UpstreamPullRequest<A>): Z => {
    switch (self.op) {
      case OpCodes.OP_PULLED: {
        return onPulled(self.value)
      }
      case OpCodes.OP_NO_UPSTREAM: {
        return onNoUpstream()
      }
    }
  }
}
