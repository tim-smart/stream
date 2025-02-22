---
title: Stream/HaltStrategy.ts
nav_order: 13
parent: Modules
---

## HaltStrategy overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [Both](#both)
  - [Either](#either)
  - [Left](#left)
  - [Right](#right)
- [folding](#folding)
  - [match](#match)
- [models](#models)
  - [Both (interface)](#both-interface)
  - [Either (interface)](#either-interface)
  - [HaltStrategy (type alias)](#haltstrategy-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [refinements](#refinements)
  - [isBoth](#isboth)
  - [isEither](#iseither)
  - [isLeft](#isleft)
  - [isRight](#isright)

---

# constructors

## Both

**Signature**

```ts
export declare const Both: HaltStrategy
```

Added in v1.0.0

## Either

**Signature**

```ts
export declare const Either: HaltStrategy
```

Added in v1.0.0

## Left

**Signature**

```ts
export declare const Left: HaltStrategy
```

Added in v1.0.0

## Right

**Signature**

```ts
export declare const Right: HaltStrategy
```

Added in v1.0.0

# folding

## match

**Signature**

```ts
export declare const match: <Z>(
  onLeft: () => Z,
  onRight: () => Z,
  onBoth: () => Z,
  onEither: () => Z
) => (self: HaltStrategy) => Z
```

Added in v1.0.0

# models

## Both (interface)

**Signature**

```ts
export interface Both {
  readonly op: 2
}
```

Added in v1.0.0

## Either (interface)

**Signature**

```ts
export interface Either {
  readonly op: 3
}
```

Added in v1.0.0

## HaltStrategy (type alias)

**Signature**

```ts
export type HaltStrategy = Left | Right | Both | Either
```

Added in v1.0.0

## Left (interface)

**Signature**

```ts
export interface Left {
  readonly op: 0
}
```

Added in v1.0.0

## Right (interface)

**Signature**

```ts
export interface Right {
  readonly op: 1
}
```

Added in v1.0.0

# refinements

## isBoth

**Signature**

```ts
export declare const isBoth: (self: HaltStrategy) => self is Both
```

Added in v1.0.0

## isEither

**Signature**

```ts
export declare const isEither: (self: HaltStrategy) => self is Either
```

Added in v1.0.0

## isLeft

**Signature**

```ts
export declare const isLeft: (self: HaltStrategy) => self is Left
```

Added in v1.0.0

## isRight

**Signature**

```ts
export declare const isRight: (self: HaltStrategy) => self is Right
```

Added in v1.0.0
