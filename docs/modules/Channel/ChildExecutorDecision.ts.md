---
title: Channel/ChildExecutorDecision.ts
nav_order: 2
parent: Modules
---

## ChildExecutorDecision overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [Close](#close)
  - [Continue](#continue)
  - [Yield](#yield)
- [folding](#folding)
  - [match](#match)
- [models](#models)
  - [ChildExecutorDecision (type alias)](#childexecutordecision-type-alias)
  - [Close (interface)](#close-interface)
  - [Continue (interface)](#continue-interface)
  - [Yield (interface)](#yield-interface)
- [refinements](#refinements)
  - [isChildExecutorDecision](#ischildexecutordecision)
  - [isClose](#isclose)
  - [isContinue](#iscontinue)
  - [isYield](#isyield)
- [symbols](#symbols)
  - [ChildExecutorDecisionTypeId](#childexecutordecisiontypeid)
  - [ChildExecutorDecisionTypeId (type alias)](#childexecutordecisiontypeid-type-alias)

---

# constructors

## Close

**Signature**

```ts
export declare const Close: (value: unknown) => ChildExecutorDecision
```

Added in v1.0.0

## Continue

**Signature**

```ts
export declare const Continue: ChildExecutorDecision
```

Added in v1.0.0

## Yield

**Signature**

```ts
export declare const Yield: ChildExecutorDecision
```

Added in v1.0.0

# folding

## match

Folds over a `ChildExecutorDecision` to produce a value of type `A`.

**Signature**

```ts
export declare const match: <A>(
  onContinue: () => A,
  onClose: (value: unknown) => A,
  onYield: () => A
) => (self: ChildExecutorDecision) => A
```

Added in v1.0.0

# models

## ChildExecutorDecision (type alias)

**Signature**

```ts
export type ChildExecutorDecision = Continue | Close | Yield
```

Added in v1.0.0

## Close (interface)

Close the current substream with a given value and pass execution to the
next substream

**Signature**

```ts
export interface Close extends ChildExecutorDecision.Proto {
  readonly op: 1
  readonly value: unknown
}
```

Added in v1.0.0

## Continue (interface)

Continue executing the current substream

**Signature**

```ts
export interface Continue extends ChildExecutorDecision.Proto {
  readonly op: 0
}
```

Added in v1.0.0

## Yield (interface)

Pass execution to the next substream. This either pulls a new element
from upstream, or yields to an already created active substream.

**Signature**

```ts
export interface Yield extends ChildExecutorDecision.Proto {
  readonly op: 2
}
```

Added in v1.0.0

# refinements

## isChildExecutorDecision

Returns `true` if the specified value is a `ChildExecutorDecision`, `false`
otherwise.

**Signature**

```ts
export declare const isChildExecutorDecision: (u: unknown) => u is ChildExecutorDecision
```

Added in v1.0.0

## isClose

Returns `true` if the specified `ChildExecutorDecision` is a `Close`, `false`
otherwise.

**Signature**

```ts
export declare const isClose: (self: ChildExecutorDecision) => self is Close
```

Added in v1.0.0

## isContinue

Returns `true` if the specified `ChildExecutorDecision` is a `Continue`,
`false` otherwise.

**Signature**

```ts
export declare const isContinue: (self: ChildExecutorDecision) => self is Continue
```

Added in v1.0.0

## isYield

Returns `true` if the specified `ChildExecutorDecision` is a `Yield`, `false`
otherwise.

**Signature**

```ts
export declare const isYield: (self: ChildExecutorDecision) => self is Yield
```

Added in v1.0.0

# symbols

## ChildExecutorDecisionTypeId

**Signature**

```ts
export declare const ChildExecutorDecisionTypeId: typeof ChildExecutorDecisionTypeId
```

Added in v1.0.0

## ChildExecutorDecisionTypeId (type alias)

**Signature**

```ts
export type ChildExecutorDecisionTypeId = typeof ChildExecutorDecisionTypeId
```

Added in v1.0.0
