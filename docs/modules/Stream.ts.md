---
title: Stream.ts
nav_order: 11
parent: Modules
---

## Stream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constants](#constants)
  - [DefaultChunkSize](#defaultchunksize)
- [constructors](#constructors)
  - [acquireRelease](#acquirerelease)
  - [async](#async)
  - [asyncEffect](#asynceffect)
  - [asyncInterrupt](#asyncinterrupt)
  - [asyncOption](#asyncoption)
  - [asyncScoped](#asyncscoped)
  - [concatAll](#concatall)
  - [die](#die)
  - [dieMessage](#diemessage)
  - [dieSync](#diesync)
  - [done](#done)
  - [empty](#empty)
  - [execute](#execute)
  - [fail](#fail)
  - [failCause](#failcause)
  - [failCauseSync](#failcausesync)
  - [failSync](#failsync)
  - [finalizer](#finalizer)
  - [fromChannel](#fromchannel)
  - [fromChunk](#fromchunk)
  - [fromChunkHub](#fromchunkhub)
  - [fromChunkHubScoped](#fromchunkhubscoped)
  - [fromChunkHubScopedWithShutdown](#fromchunkhubscopedwithshutdown)
  - [fromChunkHubWithShutdown](#fromchunkhubwithshutdown)
  - [fromChunkQueue](#fromchunkqueue)
  - [fromChunkQueueWithShutdown](#fromchunkqueuewithshutdown)
  - [fromChunks](#fromchunks)
  - [fromEffect](#fromeffect)
  - [fromEffectOption](#fromeffectoption)
  - [fromHub](#fromhub)
  - [fromHubScoped](#fromhubscoped)
  - [fromHubScopedWithShutdown](#fromhubscopedwithshutdown)
  - [fromHubWithShutdown](#fromhubwithshutdown)
  - [fromIterable](#fromiterable)
  - [fromIterableEffect](#fromiterableeffect)
  - [fromPull](#frompull)
  - [fromQueue](#fromqueue)
  - [fromQueueWithShutdown](#fromqueuewithshutdown)
  - [fromSchedule](#fromschedule)
  - [iterate](#iterate)
  - [make](#make)
  - [never](#never)
  - [paginate](#paginate)
  - [paginateChunk](#paginatechunk)
  - [paginateChunkEffect](#paginatechunkeffect)
  - [paginateEffect](#paginateeffect)
  - [range](#range)
  - [repeatEffect](#repeateffect)
  - [repeatEffectChunk](#repeateffectchunk)
  - [repeatEffectChunkOption](#repeateffectchunkoption)
  - [repeatEffectOption](#repeateffectoption)
  - [repeatEffectWithSchedule](#repeateffectwithschedule)
  - [repeatForever](#repeatforever)
  - [scoped](#scoped)
  - [succeed](#succeed)
  - [suspend](#suspend)
  - [sync](#sync)
  - [tick](#tick)
  - [unfold](#unfold)
  - [unfoldChunk](#unfoldchunk)
  - [unfoldChunkEffect](#unfoldchunkeffect)
  - [unfoldEffect](#unfoldeffect)
  - [unit](#unit)
  - [unwrap](#unwrap)
  - [unwrapScoped](#unwrapscoped)
  - [whenCase](#whencase)
- [destructors](#destructors)
  - [run](#run)
  - [runCollect](#runcollect)
  - [runCount](#runcount)
  - [runDrain](#rundrain)
  - [runFold](#runfold)
  - [runFoldEffect](#runfoldeffect)
  - [runFoldScoped](#runfoldscoped)
  - [runFoldScopedEffect](#runfoldscopedeffect)
  - [runFoldWhile](#runfoldwhile)
  - [runFoldWhileEffect](#runfoldwhileeffect)
  - [runFoldWhileScoped](#runfoldwhilescoped)
  - [runFoldWhileScopedEffect](#runfoldwhilescopedeffect)
  - [runForEach](#runforeach)
  - [runForEachChunk](#runforeachchunk)
  - [runForEachChunkScoped](#runforeachchunkscoped)
  - [runForEachScoped](#runforeachscoped)
  - [runForEachWhile](#runforeachwhile)
  - [runForEachWhileScoped](#runforeachwhilescoped)
  - [runHead](#runhead)
  - [runIntoHub](#runintohub)
  - [runIntoHubScoped](#runintohubscoped)
  - [runIntoQueue](#runintoqueue)
  - [runIntoQueueElementsScoped](#runintoqueueelementsscoped)
  - [runIntoQueueScoped](#runintoqueuescoped)
  - [runLast](#runlast)
  - [runScoped](#runscoped)
  - [runSum](#runsum)
  - [toHub](#tohub)
  - [toPull](#topull)
  - [toQueue](#toqueue)
  - [toQueueDropping](#toqueuedropping)
  - [toQueueOfElements](#toqueueofelements)
  - [toQueueSliding](#toqueuesliding)
  - [toQueueUnbounded](#toqueueunbounded)
- [elements](#elements)
  - [find](#find)
  - [findEffect](#findeffect)
- [environment](#environment)
  - [environment](#environment-1)
  - [environmentWith](#environmentwith)
  - [environmentWithEffect](#environmentwitheffect)
  - [environmentWithStream](#environmentwithstream)
  - [provideEnvironment](#provideenvironment)
  - [provideLayer](#providelayer)
  - [provideSomeEnvironment](#providesomeenvironment)
  - [provideSomeLayer](#providesomelayer)
  - [service](#service)
  - [serviceWith](#servicewith)
  - [serviceWithEffect](#servicewitheffect)
  - [serviceWithStream](#servicewithstream)
  - [updateService](#updateservice)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [catchAllCause](#catchallcause)
  - [catchSome](#catchsome)
  - [catchSomeCause](#catchsomecause)
  - [orDie](#ordie)
  - [orDieWith](#ordiewith)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseFail](#orelsefail)
  - [orElseIfEmpty](#orelseifempty)
  - [orElseIfEmptyChunk](#orelseifemptychunk)
  - [orElseIfEmptyStream](#orelseifemptystream)
  - [orElseOptional](#orelseoptional)
  - [orElseSucceed](#orelsesucceed)
  - [refineOrDie](#refineordie)
  - [refineOrDieWith](#refineordiewith)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterEffect](#filtereffect)
- [grouping](#grouping)
  - [groupAdjacentBy](#groupadjacentby)
  - [groupBy](#groupby)
- [logging](#logging)
  - [log](#log)
  - [logDebug](#logdebug)
  - [logDebugCause](#logdebugcause)
  - [logDebugCauseMessage](#logdebugcausemessage)
  - [logError](#logerror)
  - [logErrorCause](#logerrorcause)
  - [logErrorCauseMessage](#logerrorcausemessage)
  - [logFatal](#logfatal)
  - [logFatalCause](#logfatalcause)
  - [logFatalCauseMessage](#logfatalcausemessage)
  - [logInfo](#loginfo)
  - [logInfoCause](#loginfocause)
  - [logInfoCauseMessage](#loginfocausemessage)
  - [logTrace](#logtrace)
  - [logTraceCause](#logtracecause)
  - [logTraceCauseMessage](#logtracecausemessage)
  - [logWarning](#logwarning)
  - [logWarningCause](#logwarningcause)
  - [logWarningCauseMessage](#logwarningcausemessage)
- [mapping](#mapping)
  - [as](#as)
  - [map](#map)
  - [mapAccum](#mapaccum)
  - [mapAccumEffect](#mapaccumeffect)
  - [mapChunks](#mapchunks)
  - [mapChunksEffect](#mapchunkseffect)
  - [mapConcat](#mapconcat)
  - [mapConcatChunk](#mapconcatchunk)
  - [mapConcatChunkEffect](#mapconcatchunkeffect)
  - [mapConcatEffect](#mapconcateffect)
  - [mapEffect](#mapeffect)
  - [mapEffectPar](#mapeffectpar)
  - [mapEffectParByKey](#mapeffectparbykey)
  - [mapEffectParUnordered](#mapeffectparunordered)
  - [mapError](#maperror)
  - [mapErrorCause](#maperrorcause)
- [models](#models)
  - [Stream (interface)](#stream-interface)
- [mutations](#mutations)
  - [absolve](#absolve)
  - [aggregate](#aggregate)
  - [aggregateWithin](#aggregatewithin)
  - [aggregateWithinEither](#aggregatewithineither)
  - [broadcast](#broadcast)
  - [broadcastDynamic](#broadcastdynamic)
  - [broadcastedQueues](#broadcastedqueues)
  - [broadcastedQueuesDynamic](#broadcastedqueuesdynamic)
  - [buffer](#buffer)
  - [bufferChunks](#bufferchunks)
  - [bufferChunksDropping](#bufferchunksdropping)
  - [bufferChunksSliding](#bufferchunkssliding)
  - [bufferDropping](#bufferdropping)
  - [bufferSliding](#buffersliding)
  - [bufferUnbounded](#bufferunbounded)
  - [changes](#changes)
  - [changesWith](#changeswith)
  - [changesWithEffect](#changeswitheffect)
  - [chunks](#chunks)
  - [chunksWith](#chunkswith)
  - [collect](#collect)
  - [collectEffect](#collecteffect)
  - [collectLeft](#collectleft)
  - [collectRight](#collectright)
  - [collectSome](#collectsome)
  - [collectSuccess](#collectsuccess)
  - [collectWhile](#collectwhile)
  - [collectWhileEffect](#collectwhileeffect)
  - [collectWhileLeft](#collectwhileleft)
  - [collectWhileRight](#collectwhileright)
  - [collectWhileSome](#collectwhilesome)
  - [collectWhileSuccess](#collectwhilesuccess)
  - [combine](#combine)
  - [combineChunks](#combinechunks)
  - [concat](#concat)
  - [cross](#cross)
  - [crossLeft](#crossleft)
  - [crossRight](#crossright)
  - [crossWith](#crosswith)
  - [debounce](#debounce)
  - [distributedWith](#distributedwith)
  - [distributedWithDynamic](#distributedwithdynamic)
  - [drain](#drain)
  - [drainFork](#drainfork)
  - [drop](#drop)
  - [dropRight](#dropright)
  - [dropUntil](#dropuntil)
  - [dropUntilEffect](#dropuntileffect)
  - [dropWhile](#dropwhile)
  - [dropWhileEffect](#dropwhileeffect)
  - [either](#either)
  - [ensuring](#ensuring)
  - [forever](#forever)
  - [groupByKey](#groupbykey)
  - [grouped](#grouped)
  - [groupedWithin](#groupedwithin)
  - [haltAfter](#haltafter)
  - [haltWhen](#haltwhen)
  - [haltWhenDeferred](#haltwhendeferred)
  - [identity](#identity)
  - [interleave](#interleave)
  - [interleaveWith](#interleavewith)
  - [interruptAfter](#interruptafter)
  - [interruptWhen](#interruptwhen)
  - [interruptWhenDeferred](#interruptwhendeferred)
  - [intersperse](#intersperse)
  - [intersperseAffixes](#intersperseaffixes)
  - [mapBoth](#mapboth)
  - [merge](#merge)
  - [mergeAll](#mergeall)
  - [mergeAllUnbounded](#mergeallunbounded)
  - [mergeEither](#mergeeither)
  - [mergeHaltEither](#mergehalteither)
  - [mergeHaltLeft](#mergehaltleft)
  - [mergeHaltRight](#mergehaltright)
  - [mergeLeft](#mergeleft)
  - [mergeRight](#mergeright)
  - [mergeWith](#mergewith)
  - [mkString](#mkstring)
  - [onError](#onerror)
  - [partition](#partition)
  - [partitionEither](#partitioneither)
  - [peel](#peel)
  - [pipeThrough](#pipethrough)
  - [pipeThroughChannel](#pipethroughchannel)
  - [pipeThroughChannelOrFail](#pipethroughchannelorfail)
  - [prepend](#prepend)
  - [rechunk](#rechunk)
  - [repeat](#repeat)
  - [repeatEither](#repeateither)
  - [repeatElements](#repeatelements)
  - [repeatElementsEither](#repeatelementseither)
  - [repeatElementsWith](#repeatelementswith)
  - [repeatWith](#repeatwith)
  - [retry](#retry)
  - [right](#right)
  - [rightOrFail](#rightorfail)
  - [scan](#scan)
  - [scanEffect](#scaneffect)
  - [scanReduce](#scanreduce)
  - [scanReduceEffect](#scanreduceeffect)
  - [scheduleWith](#schedulewith)
  - [sliding](#sliding)
  - [some](#some)
  - [someOrElse](#someorelse)
  - [someOrFail](#someorfail)
  - [split](#split)
  - [splitOnChunk](#splitonchunk)
  - [take](#take)
  - [takeRight](#takeright)
  - [takeUntil](#takeuntil)
  - [takeUntilEffect](#takeuntileffect)
  - [takeWhile](#takewhile)
  - [tapErrorCause](#taperrorcause)
  - [throttleEnforce](#throttleenforce)
  - [throttleEnforceEffect](#throttleenforceeffect)
  - [throttleShape](#throttleshape)
  - [throttleShapeEffect](#throttleshapeeffect)
  - [timeout](#timeout)
  - [timeoutFail](#timeoutfail)
  - [timeoutFailCause](#timeoutfailcause)
  - [timeoutTo](#timeoutto)
  - [transduce](#transduce)
  - [when](#when)
  - [whenCaseEffect](#whencaseeffect)
  - [whenEffect](#wheneffect)
- [sequencing](#sequencing)
  - [branchAfter](#branchafter)
  - [flatMap](#flatmap)
  - [flatMapPar](#flatmappar)
  - [flatMapParSwitch](#flatmapparswitch)
  - [flatten](#flatten)
  - [flattenChunks](#flattenchunks)
  - [flattenEffect](#flatteneffect)
  - [flattenExit](#flattenexit)
  - [flattenExitOption](#flattenexitoption)
  - [flattenIterables](#flatteniterables)
  - [flattenPar](#flattenpar)
  - [flattenParUnbounded](#flattenparunbounded)
  - [flattenTake](#flattentake)
  - [tap](#tap)
  - [tapError](#taperror)
  - [tapSink](#tapsink)
- [symbols](#symbols)
  - [StreamTypeId](#streamtypeid)
  - [StreamTypeId (type alias)](#streamtypeid-type-alias)
- [zipping](#zipping)
  - [zip](#zip)
  - [zipAll](#zipall)
  - [zipAllLeft](#zipallleft)
  - [zipAllRight](#zipallright)
  - [zipAllSortedByKey](#zipallsortedbykey)
  - [zipAllSortedByKeyLeft](#zipallsortedbykeyleft)
  - [zipAllSortedByKeyRight](#zipallsortedbykeyright)
  - [zipAllSortedByKeyWith](#zipallsortedbykeywith)
  - [zipAllWith](#zipallwith)
  - [zipLatest](#ziplatest)
  - [zipLatestWith](#ziplatestwith)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
  - [zipWith](#zipwith)
  - [zipWithChunks](#zipwithchunks)
  - [zipWithIndex](#zipwithindex)
  - [zipWithNext](#zipwithnext)
  - [zipWithPrevious](#zipwithprevious)
  - [zipWithPreviousAndNext](#zipwithpreviousandnext)

---

# constants

## DefaultChunkSize

The default chunk size used by the various combinators and constructors of
`Stream`.

**Signature**

```ts
export declare const DefaultChunkSize: number
```

Added in v1.0.0

# constructors

## acquireRelease

Creates a stream from a single value that will get cleaned up after the
stream is consumed.

**Signature**

```ts
export declare const acquireRelease: <R, E, A, R2, _>(
  acquire: Effect.Effect<R, E, A>,
  release: (resource: A, exit: Exit.Exit<unknown, unknown>) => Effect.Effect<R2, never, _>
) => Stream<R | R2, E, A>
```

Added in v1.0.0

## async

Creates a stream from an asynchronous callback that can be called multiple
times. The optionality of the error type `E` can be used to signal the end
of the stream, by setting it to `None`.

**Signature**

```ts
export declare const async: <R, E, A>(
  register: (emit: Emit.Emit<R, E, A, void>) => void,
  outputBuffer?: number | undefined
) => Stream<R, E, A>
```

Added in v1.0.0

## asyncEffect

Creates a stream from an asynchronous callback that can be called multiple
times The registration of the callback itself returns an effect. The
optionality of the error type `E` can be used to signal the end of the
stream, by setting it to `None`.

**Signature**

```ts
export declare const asyncEffect: <R, E, A>(
  register: (emit: Emit.Emit<R, E, A, void>) => Effect.Effect<R, E, unknown>,
  outputBuffer?: number | undefined
) => Stream<R, E, A>
```

Added in v1.0.0

## asyncInterrupt

Creates a stream from an asynchronous callback that can be called multiple
times. The registration of the callback returns either a canceler or
synchronously returns a stream. The optionality of the error type `E` can
be used to signal the end of the stream, by setting it to `None`.

**Signature**

```ts
export declare const asyncInterrupt: <R, E, A>(
  register: (emit: Emit.Emit<R, E, A, void>) => Either.Either<Effect.Effect<R, never, unknown>, Stream<R, E, A>>,
  outputBuffer?: number | undefined
) => Stream<R, E, A>
```

Added in v1.0.0

## asyncOption

Creates a stream from an asynchronous callback that can be called multiple
times. The registration of the callback can possibly return the stream
synchronously. The optionality of the error type `E` can be used to signal
the end of the stream, by setting it to `None`.

**Signature**

```ts
export declare const asyncOption: <R, E, A>(
  register: (emit: Emit.Emit<R, E, A, void>) => Option.Option<Stream<R, E, A>>,
  outputBuffer?: number | undefined
) => Stream<R, E, A>
```

Added in v1.0.0

## asyncScoped

Creates a stream from an asynchronous callback that can be called multiple
times. The registration of the callback itself returns an a scoped
resource. The optionality of the error type `E` can be used to signal the
end of the stream, by setting it to `None`.

**Signature**

```ts
export declare const asyncScoped: <R, E, A>(
  register: (
    cb: (effect: Effect.Effect<R, Option.Option<E>, Chunk.Chunk<A>>) => void
  ) => Effect.Effect<R | Scope.Scope, E, unknown>,
  outputBuffer?: number | undefined
) => Stream<R, E, A>
```

Added in v1.0.0

## concatAll

Concatenates all of the streams in the chunk to one stream.

**Signature**

```ts
export declare const concatAll: <R, E, A>(streams: Chunk.Chunk<Stream<R, E, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## die

The stream that dies with the specified defect.

**Signature**

```ts
export declare const die: (defect: unknown) => Stream<never, never, never>
```

Added in v1.0.0

## dieMessage

The stream that dies with an exception described by `message`.

**Signature**

```ts
export declare const dieMessage: (message: string) => Stream<never, never, never>
```

Added in v1.0.0

## dieSync

The stream that dies with the specified lazily evaluated defect.

**Signature**

```ts
export declare const dieSync: (evaluate: LazyArg<unknown>) => Stream<never, never, never>
```

Added in v1.0.0

## done

The stream that ends with the specified `Exit` value.

**Signature**

```ts
export declare const done: <E, A>(exit: Exit.Exit<E, A>) => Stream<never, E, A>
```

Added in v1.0.0

## empty

The empty stream.

**Signature**

```ts
export declare const empty: Stream<never, never, never>
```

Added in v1.0.0

## execute

Creates a stream that executes the specified effect but emits no elements.

**Signature**

```ts
export declare const execute: <R, E, _>(effect: Effect.Effect<R, E, _>) => Stream<R, E, never>
```

Added in v1.0.0

## fail

Terminates with the specified error.

**Signature**

```ts
export declare const fail: <E>(error: E) => Stream<never, E, never>
```

Added in v1.0.0

## failCause

The stream that always fails with the specified `Cause`.

**Signature**

```ts
export declare const failCause: <E>(cause: Cause.Cause<E>) => Stream<never, E, never>
```

Added in v1.0.0

## failCauseSync

The stream that always fails with the specified lazily evaluated `Cause`.

**Signature**

```ts
export declare const failCauseSync: <E>(evaluate: LazyArg<Cause.Cause<E>>) => Stream<never, E, never>
```

Added in v1.0.0

## failSync

Terminates with the specified lazily evaluated error.

**Signature**

```ts
export declare const failSync: <E>(evaluate: LazyArg<E>) => Stream<never, E, never>
```

Added in v1.0.0

## finalizer

Creates a one-element stream that never fails and executes the finalizer
when it ends.

**Signature**

```ts
export declare const finalizer: <R, _>(finalizer: Effect.Effect<R, never, _>) => Stream<R, never, void>
```

Added in v1.0.0

## fromChannel

Creates a stream from a `Channel`.

**Signature**

```ts
export declare const fromChannel: <R, E, A>(
  channel: Channel.Channel<R, unknown, unknown, unknown, E, Chunk.Chunk<A>, unknown>
) => Stream<R, E, A>
```

Added in v1.0.0

## fromChunk

Creates a stream from a `Chunk` of values.

**Signature**

```ts
export declare const fromChunk: <A>(chunk: Chunk.Chunk<A>) => Stream<never, never, A>
```

Added in v1.0.0

## fromChunkHub

Creates a stream from a subscription to a `Hub`.

**Signature**

```ts
export declare const fromChunkHub: <A>(hub: Hub.Hub<Chunk.Chunk<A>>) => Stream<never, never, A>
```

Added in v1.0.0

## fromChunkHubScoped

Creates a stream from a subscription to a `Hub` in the context of a scoped
effect. The scoped effect describes subscribing to receive messages from
the hub while the stream describes taking messages from the hub.

**Signature**

```ts
export declare const fromChunkHubScoped: <A>(
  hub: Hub.Hub<Chunk.Chunk<A>>
) => Effect.Effect<Scope.Scope, never, Stream<never, never, A>>
```

Added in v1.0.0

## fromChunkHubScopedWithShutdown

Creates a stream from a subscription to a `Hub` in the context of a scoped
effect. The scoped effect describes subscribing to receive messages from
the hub while the stream describes taking messages from the hub.

The hub will be shut down once the stream is closed.

**Signature**

```ts
export declare const fromChunkHubScopedWithShutdown: <A>(
  hub: Hub.Hub<Chunk.Chunk<A>>
) => Effect.Effect<Scope.Scope, never, Stream<never, never, A>>
```

Added in v1.0.0

## fromChunkHubWithShutdown

Creates a stream from a subscription to a `Hub`.

The hub will be shut down once the stream is closed.

**Signature**

```ts
export declare const fromChunkHubWithShutdown: <A>(hub: Hub.Hub<Chunk.Chunk<A>>) => Stream<never, never, A>
```

Added in v1.0.0

## fromChunkQueue

Creates a stream from a `Queue` of values.

**Signature**

```ts
export declare const fromChunkQueue: <A>(queue: Queue.Dequeue<Chunk.Chunk<A>>) => Stream<never, never, A>
```

Added in v1.0.0

## fromChunkQueueWithShutdown

Creates a stream from a `Queue` of values.

The queue will be shutdown once the stream is closed.

**Signature**

```ts
export declare const fromChunkQueueWithShutdown: <A>(queue: Queue.Dequeue<Chunk.Chunk<A>>) => Stream<never, never, A>
```

Added in v1.0.0

## fromChunks

Creates a stream from an arbitrary number of chunks.

**Signature**

```ts
export declare const fromChunks: <A>(...chunks: Chunk.Chunk<A>[]) => Stream<never, never, A>
```

Added in v1.0.0

## fromEffect

Either emits the success value of this effect or terminates the stream
with the failure value of this effect.

**Signature**

```ts
export declare const fromEffect: <R, E, A>(effect: Effect.Effect<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## fromEffectOption

Creates a stream from an effect producing a value of type `A` or an empty
`Stream`.

**Signature**

```ts
export declare const fromEffectOption: <R, E, A>(effect: Effect.Effect<R, Option.Option<E>, A>) => Stream<R, E, A>
```

Added in v1.0.0

## fromHub

Creates a stream from a subscription to a `Hub`.

**Signature**

```ts
export declare const fromHub: <A>(hub: Hub.Hub<A>, maxChunkSize?: number | undefined) => Stream<never, never, A>
```

Added in v1.0.0

## fromHubScoped

Creates a stream from a subscription to a `Hub` in the context of a scoped
effect. The scoped effect describes subscribing to receive messages from
the hub while the stream describes taking messages from the hub.

**Signature**

```ts
export declare const fromHubScoped: <A>(
  hub: Hub.Hub<A>,
  maxChunkSize?: number | undefined
) => Effect.Effect<Scope.Scope, never, Stream<never, never, A>>
```

Added in v1.0.0

## fromHubScopedWithShutdown

Creates a stream from a subscription to a `Hub` in the context of a scoped
effect. The scoped effect describes subscribing to receive messages from
the hub while the stream describes taking messages from the hub.

The hub will be shut down once the stream is closed.

**Signature**

```ts
export declare const fromHubScopedWithShutdown: <A>(
  hub: Hub.Hub<A>,
  maxChunkSize?: number | undefined
) => Effect.Effect<Scope.Scope, never, Stream<never, never, A>>
```

Added in v1.0.0

## fromHubWithShutdown

Creates a stream from a subscription to a `Hub`.

The hub will be shut down once the stream is closed.

**Signature**

```ts
export declare const fromHubWithShutdown: <A>(
  hub: Hub.Hub<A>,
  maxChunkSize?: number | undefined
) => Stream<never, never, A>
```

Added in v1.0.0

## fromIterable

Creates a stream from an `Iterable` collection of values.

**Signature**

```ts
export declare const fromIterable: <A>(iterable: Iterable<A>) => Stream<never, never, A>
```

Added in v1.0.0

## fromIterableEffect

Creates a stream from an effect producing a value of type `Iterable<A>`.

**Signature**

```ts
export declare const fromIterableEffect: <R, E, A>(effect: Effect.Effect<R, E, Iterable<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## fromPull

Creates a stream from an effect that pulls elements from another stream.

See `Stream.toPull` for reference.

**Signature**

```ts
export declare const fromPull: <R, R2, E, A>(
  effect: Effect.Effect<Scope.Scope | R, never, Effect.Effect<R2, Option.Option<E>, Chunk.Chunk<A>>>
) => Stream<R | R2, E, A>
```

Added in v1.0.0

## fromQueue

Creates a stream from a queue of values

**Signature**

```ts
export declare const fromQueue: <A>(
  queue: Queue.Dequeue<A>,
  maxChunkSize?: number | undefined
) => Stream<never, never, A>
```

Added in v1.0.0

## fromQueueWithShutdown

Creates a stream from a queue of values. The queue will be shutdown once
the stream is closed.

**Signature**

```ts
export declare const fromQueueWithShutdown: <A>(
  queue: Queue.Dequeue<A>,
  maxChunkSize?: number | undefined
) => Stream<never, never, A>
```

Added in v1.0.0

## fromSchedule

Creates a stream from a `Schedule` that does not require any further
input. The stream will emit an element for each value output from the
schedule, continuing for as long as the schedule continues.

**Signature**

```ts
export declare const fromSchedule: <R, A>(schedule: Schedule.Schedule<R, unknown, A>) => Stream<R, never, A>
```

Added in v1.0.0

## iterate

The infinite stream of iterative function application: a, f(a), f(f(a)),
f(f(f(a))), ...

**Signature**

```ts
export declare const iterate: <A>(value: A, next: (value: A) => A) => Stream<never, never, A>
```

Added in v1.0.0

## make

Creates a stream from an sequence of values.

**Signature**

```ts
export declare const make: <As extends any[]>(...as: As) => Stream<never, never, As[number]>
```

Added in v1.0.0

## never

The stream that never produces any value or fails with any error.

**Signature**

```ts
export declare const never: () => Stream<never, never, never>
```

Added in v1.0.0

## paginate

Like `Stream.unfold`, but allows the emission of values to end one step further
than the unfolding of the state. This is useful for embedding paginated
APIs, hence the name.

**Signature**

```ts
export declare const paginate: <S, A>(s: S, f: (s: S) => readonly [A, Option.Option<S>]) => Stream<never, never, A>
```

Added in v1.0.0

## paginateChunk

Like `Stream.unfoldChunk`, but allows the emission of values to end one step
further than the unfolding of the state. This is useful for embedding
paginated APIs, hence the name.

**Signature**

```ts
export declare const paginateChunk: <S, A>(
  s: S,
  f: (s: S) => readonly [Chunk.Chunk<A>, Option.Option<S>]
) => Stream<never, never, A>
```

Added in v1.0.0

## paginateChunkEffect

Like `Stream.unfoldChunkEffect`, but allows the emission of values to end one step
further than the unfolding of the state. This is useful for embedding
paginated APIs, hence the name.

**Signature**

```ts
export declare const paginateChunkEffect: <S, R, E, A>(
  s: S,
  f: (s: S) => Effect.Effect<R, E, readonly [Chunk.Chunk<A>, Option.Option<S>]>
) => Stream<R, E, A>
```

Added in v1.0.0

## paginateEffect

Like `Stream.unfoldEffect` but allows the emission of values to end one step
further than the unfolding of the state. This is useful for embedding
paginated APIs, hence the name.

**Signature**

```ts
export declare const paginateEffect: <S, R, E, A>(
  s: S,
  f: (s: S) => Effect.Effect<R, E, readonly [A, Option.Option<S>]>
) => Stream<R, E, A>
```

Added in v1.0.0

## range

Constructs a stream from a range of integers (lower bound included, upper
bound not included).

**Signature**

```ts
export declare const range: (min: number, max: number, chunkSize?: number | undefined) => Stream<never, never, number>
```

Added in v1.0.0

## repeatEffect

Creates a stream from an effect producing a value of type `A` which repeats
forever.

**Signature**

```ts
export declare const repeatEffect: <R, E, A>(effect: Effect.Effect<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## repeatEffectChunk

Creates a stream from an effect producing chunks of `A` values which
repeats forever.

**Signature**

```ts
export declare const repeatEffectChunk: <R, E, A>(effect: Effect.Effect<R, E, Chunk.Chunk<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## repeatEffectChunkOption

Creates a stream from an effect producing chunks of `A` values until it
fails with `None`.

**Signature**

```ts
export declare const repeatEffectChunkOption: <R, E, A>(
  effect: Effect.Effect<R, Option.Option<E>, Chunk.Chunk<A>>
) => Stream<R, E, A>
```

Added in v1.0.0

## repeatEffectOption

Creates a stream from an effect producing values of type `A` until it fails
with `None`.

**Signature**

```ts
export declare const repeatEffectOption: <R, E, A>(effect: Effect.Effect<R, Option.Option<E>, A>) => Stream<R, E, A>
```

Added in v1.0.0

## repeatEffectWithSchedule

Creates a stream from an effect producing a value of type `A`, which is
repeated using the specified schedule.

**Signature**

```ts
export declare const repeatEffectWithSchedule: <R, E, A, R2, _>(
  effect: Effect.Effect<R, E, A>,
  schedule: Schedule.Schedule<R2, A, _>
) => Stream<R | R2, E, A>
```

Added in v1.0.0

## repeatForever

Repeats the provided value infinitely.

**Signature**

```ts
export declare const repeatForever: <A>(value: A) => Stream<never, never, A>
```

Added in v1.0.0

## scoped

Creates a single-valued stream from a scoped resource.

**Signature**

```ts
export declare const scoped: <R, E, A>(
  effect: Effect.Effect<Scope.Scope | R, E, A>
) => Stream<Exclude<R, Scope.Scope>, E, A>
```

Added in v1.0.0

## succeed

Creates a single-valued pure stream.

**Signature**

```ts
export declare const succeed: <A>(value: A) => Stream<never, never, A>
```

Added in v1.0.0

## suspend

Returns a lazily constructed stream.

**Signature**

```ts
export declare const suspend: <R, E, A>(stream: LazyArg<Stream<R, E, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## sync

Creates a single-valued pure stream.

**Signature**

```ts
export declare const sync: <A>(evaluate: LazyArg<A>) => Stream<never, never, A>
```

Added in v1.0.0

## tick

A stream that emits Unit values spaced by the specified duration.

**Signature**

```ts
export declare const tick: (interval: Duration.Duration) => Stream<never, never, void>
```

Added in v1.0.0

## unfold

Creates a stream by peeling off the "layers" of a value of type `S`.

**Signature**

```ts
export declare const unfold: <S, A>(s: S, f: (s: S) => Option.Option<readonly [A, S]>) => Stream<never, never, A>
```

Added in v1.0.0

## unfoldChunk

Creates a stream by peeling off the "layers" of a value of type `S`.

**Signature**

```ts
export declare const unfoldChunk: <S, A>(
  s: S,
  f: (s: S) => Option.Option<readonly [Chunk.Chunk<A>, S]>
) => Stream<never, never, A>
```

Added in v1.0.0

## unfoldChunkEffect

Creates a stream by effectfully peeling off the "layers" of a value of type
`S`.

**Signature**

```ts
export declare const unfoldChunkEffect: <R, E, A, S>(
  s: S,
  f: (s: S) => Effect.Effect<R, E, Option.Option<readonly [Chunk.Chunk<A>, S]>>
) => Stream<R, E, A>
```

Added in v1.0.0

## unfoldEffect

Creates a stream by effectfully peeling off the "layers" of a value of type
`S`.

**Signature**

```ts
export declare const unfoldEffect: <S, R, E, A>(
  s: S,
  f: (s: S) => Effect.Effect<R, E, Option.Option<readonly [A, S]>>
) => Stream<R, E, A>
```

Added in v1.0.0

## unit

A stream that contains a single `Unit` value.

**Signature**

```ts
export declare const unit: () => Stream<never, never, void>
```

Added in v1.0.0

## unwrap

Creates a stream produced from an `Effect`.

**Signature**

```ts
export declare const unwrap: <R, E, R2, E2, A>(
  effect: Effect.Effect<R, E, Stream<R2, E2, A>>
) => Stream<R | R2, E | E2, A>
```

Added in v1.0.0

## unwrapScoped

Creates a stream produced from a scoped `Effect`.

**Signature**

```ts
export declare const unwrapScoped: <R, E, R2, E2, A>(
  effect: Effect.Effect<Scope.Scope | R, E, Stream<R2, E2, A>>
) => Stream<R2 | Exclude<R, Scope.Scope>, E | E2, A>
```

Added in v1.0.0

## whenCase

Returns the resulting stream when the given `PartialFunction` is defined
for the given value, otherwise returns an empty stream.

**Signature**

```ts
export declare const whenCase: <A, R, E, A2>(
  evaluate: LazyArg<A>,
  pf: (a: A) => Option.Option<Stream<R, E, A2>>
) => Stream<R, E, A2>
```

Added in v1.0.0

# destructors

## run

Runs the sink on the stream to produce either the sink's result or an error.

**Signature**

```ts
export declare const run: <R2, E2, A, Z>(
  sink: Sink.Sink<R2, E2, A, unknown, Z>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, Z>
```

Added in v1.0.0

## runCollect

Runs the stream and collects all of its elements to a chunk.

**Signature**

```ts
export declare const runCollect: <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## runCount

Runs the stream and emits the number of elements processed

**Signature**

```ts
export declare const runCount: <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<R, E, number>
```

Added in v1.0.0

## runDrain

Runs the stream only for its effects. The emitted elements are discarded.

**Signature**

```ts
export declare const runDrain: <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<R, E, void>
```

Added in v1.0.0

## runFold

Executes a pure fold over the stream of values - reduces all elements in
the stream to a value of type `S`.

**Signature**

```ts
export declare const runFold: <S, A>(
  s: S,
  f: (s: S, a: A) => S
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R, E, S>
```

Added in v1.0.0

## runFoldEffect

Executes an effectful fold over the stream of values.

**Signature**

```ts
export declare const runFoldEffect: <S, A, R2, E2>(
  s: S,
  f: (s: S, a: A) => Effect.Effect<R2, E2, S>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, S>
```

Added in v1.0.0

## runFoldScoped

Executes a pure fold over the stream of values. Returns a scoped value that
represents the scope of the stream.

**Signature**

```ts
export declare const runFoldScoped: <S, A>(
  s: S,
  f: (s: S, a: A) => S
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, E, S>
```

Added in v1.0.0

## runFoldScopedEffect

Executes an effectful fold over the stream of values. Returns a scoped
value that represents the scope of the stream.

**Signature**

```ts
export declare const runFoldScopedEffect: <S, A, R2, E2>(
  s: S,
  f: (s: S, a: A) => Effect.Effect<R2, E2, S>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, S>
```

Added in v1.0.0

## runFoldWhile

Reduces the elements in the stream to a value of type `S`. Stops the fold
early when the condition is not fulfilled. Example:

**Signature**

```ts
export declare const runFoldWhile: <S, A>(
  s: S,
  cont: Predicate<S>,
  f: (s: S, a: A) => S
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R, E, S>
```

Added in v1.0.0

## runFoldWhileEffect

Executes an effectful fold over the stream of values. Stops the fold early
when the condition is not fulfilled.

**Signature**

```ts
export declare const runFoldWhileEffect: <S, A, R2, E2>(
  s: S,
  cont: Predicate<S>,
  f: (s: S, a: A) => Effect.Effect<R2, E2, S>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, S>
```

Added in v1.0.0

## runFoldWhileScoped

Executes a pure fold over the stream of values. Returns a scoped value that
represents the scope of the stream. Stops the fold early when the condition
is not fulfilled.

**Signature**

```ts
export declare const runFoldWhileScoped: <S, A>(
  s: S,
  cont: Predicate<S>,
  f: (s: S, a: A) => S
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, E, S>
```

Added in v1.0.0

## runFoldWhileScopedEffect

Executes an effectful fold over the stream of values. Returns a scoped
value that represents the scope of the stream. Stops the fold early when
the condition is not fulfilled.

**Signature**

```ts
export declare const runFoldWhileScopedEffect: <S, A, R2, E2>(
  s: S,
  cont: Predicate<S>,
  f: (s: S, a: A) => Effect.Effect<R2, E2, S>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, S>
```

Added in v1.0.0

## runForEach

Consumes all elements of the stream, passing them to the specified
callback.

**Signature**

```ts
export declare const runForEach: <A, R2, E2, _>(
  f: (a: A) => Effect.Effect<R2, E2, _>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, void>
```

Added in v1.0.0

## runForEachChunk

Consumes all elements of the stream, passing them to the specified
callback.

**Signature**

```ts
export declare const runForEachChunk: <A, R2, E2, _>(
  f: (a: Chunk.Chunk<A>) => Effect.Effect<R2, E2, _>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, void>
```

Added in v1.0.0

## runForEachChunkScoped

Like `Stream.runForEachChunk`, but returns a scoped effect so the
finalization order can be controlled.

**Signature**

```ts
export declare const runForEachChunkScoped: <A, R2, E2, _>(
  f: (a: Chunk.Chunk<A>) => Effect.Effect<R2, E2, _>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, void>
```

Added in v1.0.0

## runForEachScoped

Like `Stream.forEach`, but returns a scoped effect so the finalization
order can be controlled.

**Signature**

```ts
export declare const runForEachScoped: <A, R2, E2, _>(
  f: (a: A) => Effect.Effect<R2, E2, _>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, void>
```

Added in v1.0.0

## runForEachWhile

Consumes elements of the stream, passing them to the specified callback,
and terminating consumption when the callback returns `false`.

**Signature**

```ts
export declare const runForEachWhile: <A, R2, E2>(
  f: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<R2 | R, E2 | E, void>
```

Added in v1.0.0

## runForEachWhileScoped

Like `Stream.runForEachWhile`, but returns a scoped effect so the
finalization order can be controlled.

**Signature**

```ts
export declare const runForEachWhileScoped: <A, R2, E2>(
  f: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, void>
```

Added in v1.0.0

## runHead

Runs the stream to completion and yields the first value emitted by it,
discarding the rest of the elements.

**Signature**

```ts
export declare const runHead: <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<R, E, Option.Option<A>>
```

Added in v1.0.0

## runIntoHub

Publishes elements of this stream to a hub. Stream failure and ending will
also be signalled.

**Signature**

```ts
export declare const runIntoHub: <E, A>(
  hub: Hub.Hub<Take.Take<E, A>>
) => <R>(self: Stream<R, E, A>) => Effect.Effect<R, never, void>
```

Added in v1.0.0

## runIntoHubScoped

Like `Stream.runIntoHub`, but provides the result as a scoped effect to
allow for scope composition.

**Signature**

```ts
export declare const runIntoHubScoped: <E, A>(
  hub: Hub.Hub<Take.Take<E, A>>
) => <R>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, void>
```

Added in v1.0.0

## runIntoQueue

Enqueues elements of this stream into a queue. Stream failure and ending
will also be signalled.

**Signature**

```ts
export declare const runIntoQueue: <E, A>(
  queue: Queue.Enqueue<Take.Take<E, A>>
) => <R>(self: Stream<R, E, A>) => Effect.Effect<R, never, void>
```

Added in v1.0.0

## runIntoQueueElementsScoped

Like `Stream.runIntoQueue`, but provides the result as a scoped [[ZIO]]
to allow for scope composition.

**Signature**

```ts
export declare const runIntoQueueElementsScoped: <E, A>(
  queue: Queue.Enqueue<Exit.Exit<Option.Option<E>, A>>
) => <R>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, void>
```

Added in v1.0.0

## runIntoQueueScoped

Like `Stream.runIntoQueue`, but provides the result as a scoped effect
to allow for scope composition.

**Signature**

```ts
export declare const runIntoQueueScoped: <E, A>(
  queue: Queue.Enqueue<Take.Take<E, A>>
) => <R>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, void>
```

Added in v1.0.0

## runLast

Runs the stream to completion and yields the last value emitted by it,
discarding the rest of the elements.

**Signature**

```ts
export declare const runLast: <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<R, E, Option.Option<A>>
```

Added in v1.0.0

## runScoped

**Signature**

```ts
export declare const runScoped: <R2, E2, A, A2>(
  sink: Sink.Sink<R2, E2, A, unknown, A2>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, A2>
```

Added in v1.0.0

## runSum

Runs the stream to a sink which sums elements, provided they are Numeric.

**Signature**

```ts
export declare const runSum: <R, E>(self: Stream<R, E, number>) => Effect.Effect<R, E, number>
```

Added in v1.0.0

## toHub

Converts the stream to a scoped hub of chunks. After the scope is closed,
the hub will never again produce values and should be discarded.

**Signature**

```ts
export declare const toHub: (
  capacity: number
) => <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, Hub.Hub<Take.Take<E, A>>>
```

Added in v1.0.0

## toPull

Returns in a scope a ZIO effect that can be used to repeatedly pull chunks
from the stream. The pull effect fails with None when the stream is
finished, or with Some error if it fails, otherwise it returns a chunk of
the stream's output.

**Signature**

```ts
export declare const toPull: <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Effect.Effect<R, Option.Option<E>, Chunk.Chunk<A>>>
```

Added in v1.0.0

## toQueue

Converts the stream to a scoped queue of chunks. After the scope is closed,
the queue will never again produce values and should be discarded.

**Signature**

```ts
export declare const toQueue: (
  capacity?: number | undefined
) => <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, Queue.Dequeue<Take.Take<E, A>>>
```

Added in v1.0.0

## toQueueDropping

Converts the stream to a dropping scoped queue of chunks. After the scope
is closed, the queue will never again produce values and should be
discarded.

**Signature**

```ts
export declare const toQueueDropping: (
  capacity?: number | undefined
) => <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, Queue.Dequeue<Take.Take<E, A>>>
```

Added in v1.0.0

## toQueueOfElements

Converts the stream to a scoped queue of elements. After the scope is
closed, the queue will never again produce values and should be discarded.

**Signature**

```ts
export declare const toQueueOfElements: (
  capacity?: number | undefined
) => <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Queue.Dequeue<Exit.Exit<Option.Option<E>, A>>>
```

Added in v1.0.0

## toQueueSliding

Converts the stream to a sliding scoped queue of chunks. After the scope is
closed, the queue will never again produce values and should be discarded.

**Signature**

```ts
export declare const toQueueSliding: (
  capacity?: number | undefined
) => <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, Queue.Dequeue<Take.Take<E, A>>>
```

Added in v1.0.0

## toQueueUnbounded

Converts the stream into an unbounded scoped queue. After the scope is
closed, the queue will never again produce values and should be discarded.

**Signature**

```ts
export declare const toQueueUnbounded: <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Queue.Dequeue<Take.Take<E, A>>>
```

Added in v1.0.0

# elements

## find

Finds the first element emitted by this stream that satisfies the provided
predicate.

**Signature**

```ts
export declare const find: {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(self: Stream<R, E, A>) => Stream<R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
}
```

Added in v1.0.0

## findEffect

Finds the first element emitted by this stream that satisfies the provided
effectful predicate.

**Signature**

```ts
export declare const findEffect: <A, R2, E2>(
  predicate: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

# environment

## environment

Accesses the whole environment of the stream.

**Signature**

```ts
export declare const environment: <R>() => Stream<R, never, Context.Context<R>>
```

Added in v1.0.0

## environmentWith

Accesses the environment of the stream.

**Signature**

```ts
export declare const environmentWith: <R, A>(f: (env: Context.Context<R>) => A) => Stream<R, never, A>
```

Added in v1.0.0

## environmentWithEffect

Accesses the environment of the stream in the context of an effect.

**Signature**

```ts
export declare const environmentWithEffect: <R0, R, E, A>(
  f: (env: Context.Context<R0>) => Effect.Effect<R, E, A>
) => Stream<R0 | R, E, A>
```

Added in v1.0.0

## environmentWithStream

Accesses the environment of the stream in the context of a stream.

**Signature**

```ts
export declare const environmentWithStream: <R0, R, E, A>(
  f: (env: Context.Context<R0>) => Stream<R, E, A>
) => Stream<R0 | R, E, A>
```

Added in v1.0.0

## provideEnvironment

Provides the stream with its required environment, which eliminates its
dependency on `R`.

**Signature**

```ts
export declare const provideEnvironment: <R>(
  environment: Context.Context<R>
) => <E, A>(self: Stream<R, E, A>) => Stream<never, E, A>
```

Added in v1.0.0

## provideLayer

Provides a `Layer` to the stream, which translates it to another level.

**Signature**

```ts
export declare const provideLayer: <RIn, E2, ROut>(
  layer: Layer.Layer<RIn, E2, ROut>
) => <E, A>(self: Stream<ROut, E, A>) => Stream<RIn, E2 | E, A>
```

Added in v1.0.0

## provideSomeEnvironment

Transforms the environment being provided to the stream with the specified
function.

**Signature**

```ts
export declare const provideSomeEnvironment: <R0, R>(
  f: (env: Context.Context<R0>) => Context.Context<R>
) => <E, A>(self: Stream<R, E, A>) => Stream<R0, E, A>
```

Added in v1.0.0

## provideSomeLayer

Splits the environment into two parts, providing one part using the
specified layer and leaving the remainder `R0`.

**Signature**

```ts
export declare const provideSomeLayer: <RIn, E2, ROut>(
  layer: Layer.Layer<RIn, E2, ROut>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<RIn | Exclude<R, ROut>, E2 | E, A>
```

Added in v1.0.0

## service

Accesses the specified service in the environment of the effect.

**Signature**

```ts
export declare const service: <T>(tag: Context.Tag<T>) => Stream<T, never, T>
```

Added in v1.0.0

## serviceWith

Accesses the specified service in the environment of the stream.

**Signature**

```ts
export declare const serviceWith: <T>(tag: Context.Tag<T>) => <A>(f: (service: T) => A) => Stream<T, never, A>
```

Added in v1.0.0

## serviceWithEffect

Accesses the specified service in the environment of the stream in the
context of an effect.

**Signature**

```ts
export declare const serviceWithEffect: <T>(
  tag: Context.Tag<T>
) => <R, E, A>(f: (service: T) => Effect.Effect<R, E, A>) => Stream<T | R, E, A>
```

Added in v1.0.0

## serviceWithStream

Accesses the specified service in the environment of the stream in the
context of a stream.

**Signature**

```ts
export declare const serviceWithStream: <T>(
  tag: Context.Tag<T>
) => <R, E, A>(f: (service: T) => Stream<R, E, A>) => Stream<T | R, E, A>
```

Added in v1.0.0

## updateService

Updates the specified service within the environment of the `Stream`.

**Signature**

```ts
export declare const updateService: <T>(
  tag: Context.Tag<T>
) => (f: (service: T) => T) => <R, E, A>(self: Stream<R, E, A>) => Stream<T | R, E, A>
```

Added in v1.0.0

# error handling

## catchAll

Switches over to the stream produced by the provided function in case this
one fails with a typed error.

**Signature**

```ts
export declare const catchAll: <E, R2, E2, A2>(
  f: (error: E) => Stream<R2, E2, A2>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2, A2 | A>
```

Added in v1.0.0

## catchAllCause

Switches over to the stream produced by the provided function in case this
one fails. Allows recovery from all causes of failure, including
interruption if the stream is uninterruptible.

**Signature**

```ts
export declare const catchAllCause: <E, R2, E2, A2>(
  f: (cause: Cause.Cause<E>) => Stream<R2, E2, A2>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2, A2 | A>
```

Added in v1.0.0

## catchSome

Switches over to the stream produced by the provided function in case this
one fails with some typed error.

**Signature**

```ts
export declare const catchSome: <E, R2, E2, A2>(
  pf: (error: E) => Option.Option<Stream<R2, E2, A2>>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E | E2, A2 | A>
```

Added in v1.0.0

## catchSomeCause

Switches over to the stream produced by the provided function in case this
one fails with some errors. Allows recovery from all causes of failure,
including interruption if the stream is uninterruptible.

**Signature**

```ts
export declare const catchSomeCause: <E, R2, E2, A2>(
  pf: (cause: Cause.Cause<E>) => Option.Option<Stream<R2, E2, A2>>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E | E2, A2 | A>
```

Added in v1.0.0

## orDie

Translates any failure into a stream termination, making the stream
infallible and all failures unchecked.

**Signature**

```ts
export declare const orDie: <R, E, A>(self: Stream<R, E, A>) => Stream<R, never, A>
```

Added in v1.0.0

## orDieWith

Keeps none of the errors, and terminates the stream with them, using the
specified function to convert the `E` into a defect.

**Signature**

```ts
export declare const orDieWith: <E>(f: (e: E) => unknown) => <R, A>(self: Stream<R, E, A>) => Stream<R, never, A>
```

Added in v1.0.0

## orElse

Switches to the provided stream in case this one fails with a typed error.

See also `Stream.catchAll`.

**Signature**

```ts
export declare const orElse: <R2, E2, A2>(
  that: LazyArg<Stream<R2, E2, A2>>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2, A2 | A>
```

Added in v1.0.0

## orElseEither

Switches to the provided stream in case this one fails with a typed error.

See also `Stream.catchAll`.

**Signature**

```ts
export declare const orElseEither: <R2, E2, A2>(
  that: LazyArg<Stream<R2, E2, A2>>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2, Either.Either<A, A2>>
```

Added in v1.0.0

## orElseFail

Fails with given error in case this one fails with a typed error.

See also `Stream.catchAll`.

**Signature**

```ts
export declare const orElseFail: <E2>(error: LazyArg<E2>) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2, A>
```

Added in v1.0.0

## orElseIfEmpty

Produces the specified element if this stream is empty.

**Signature**

```ts
export declare const orElseIfEmpty: <A2>(
  element: LazyArg<A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A2 | A>
```

Added in v1.0.0

## orElseIfEmptyChunk

Produces the specified chunk if this stream is empty.

**Signature**

```ts
export declare const orElseIfEmptyChunk: <A2>(
  chunk: LazyArg<Chunk.Chunk<A2>>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A2 | A>
```

Added in v1.0.0

## orElseIfEmptyStream

Switches to the provided stream in case this one is empty.

**Signature**

```ts
export declare const orElseIfEmptyStream: <R2, E2, A2>(
  stream: LazyArg<Stream<R2, E2, A2>>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## orElseOptional

Switches to the provided stream in case this one fails with the `None`
value.

See also `Stream.catchAll`.

**Signature**

```ts
export declare const orElseOptional: <R2, E2, A2>(
  that: LazyArg<Stream<R2, Option.Option<E2>, A2>>
) => <R, E, A>(self: Stream<R, Option.Option<E>, A>) => Stream<R2 | R, Option.Option<E2 | E>, A2 | A>
```

Added in v1.0.0

## orElseSucceed

Succeeds with the specified value if this one fails with a typed error.

**Signature**

```ts
export declare const orElseSucceed: <A2>(
  value: LazyArg<A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, never, A2 | A>
```

Added in v1.0.0

## refineOrDie

Keeps some of the errors, and terminates the fiber with the rest

**Signature**

```ts
export declare const refineOrDie: <E, E2>(
  pf: (error: E) => Option.Option<E2>
) => <R, A>(self: Stream<R, E, A>) => Stream<R, E2, A>
```

Added in v1.0.0

## refineOrDieWith

Keeps some of the errors, and terminates the fiber with the rest, using the
specified function to convert the `E` into a defect.

**Signature**

```ts
export declare const refineOrDieWith: <E, E2>(
  pf: (error: E) => Option.Option<E2>,
  f: (error: E) => unknown
) => <R, A>(self: Stream<R, E, A>) => Stream<R, E2, A>
```

Added in v1.0.0

# filtering

## filter

Filters the elements emitted by this stream using the provided function.

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(self: Stream<R, E, A>) => Stream<R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
}
```

Added in v1.0.0

## filterEffect

Effectfully filters the elements emitted by this stream.

**Signature**

```ts
export declare const filterEffect: <A, R2, E2>(
  f: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

# grouping

## groupAdjacentBy

Creates a pipeline that groups on adjacent keys, calculated by the
specified function.

**Signature**

```ts
export declare const groupAdjacentBy: <A, K>(
  f: (a: A) => K
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, readonly [K, Chunk.NonEmptyChunk<A>]>
```

Added in v1.0.0

## groupBy

More powerful version of `Stream.groupByKey`.

**Signature**

```ts
export declare const groupBy: <A, R2, E2, K, V>(
  f: (a: A) => Effect.Effect<R2, E2, readonly [K, V]>,
  bufferSize?: number | undefined
) => <R, E>(self: Stream<R, E, A>) => GroupBy.GroupBy<R2 | R, E2 | E, K, V>
```

Added in v1.0.0

# logging

## log

Logs the specified message at the current log level.

**Signature**

```ts
export declare const log: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logDebug

Logs the specified message at the debug log level.

**Signature**

```ts
export declare const logDebug: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logDebugCause

Logs the specified `Cause` at the debug log level.

**Signature**

```ts
export declare const logDebugCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logDebugCauseMessage

Logs the specified message and `Cause` at the debug log level.

**Signature**

```ts
export declare const logDebugCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logError

Logs the specified message at the error log level.

**Signature**

```ts
export declare const logError: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logErrorCause

Logs the specified `Cause` at the error log level.

**Signature**

```ts
export declare const logErrorCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logErrorCauseMessage

Logs the specified message and `Cause` at the error log level.

**Signature**

```ts
export declare const logErrorCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logFatal

Logs the specified message at the fatal log level.

**Signature**

```ts
export declare const logFatal: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logFatalCause

Logs the specified `Cause` at the fatal log level.

**Signature**

```ts
export declare const logFatalCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logFatalCauseMessage

Logs the specified message and `Cause` at the fatal log level.

**Signature**

```ts
export declare const logFatalCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logInfo

Logs the specified message at the info log level.

**Signature**

```ts
export declare const logInfo: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logInfoCause

Logs the specified `Cause` at the info log level.

**Signature**

```ts
export declare const logInfoCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logInfoCauseMessage

Logs the specified message and `Cause` at the info log level.

**Signature**

```ts
export declare const logInfoCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logTrace

Logs the specified message at the trace log level.

**Signature**

```ts
export declare const logTrace: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logTraceCause

Logs the specified `Cause` at the trace log level.

**Signature**

```ts
export declare const logTraceCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logTraceCauseMessage

Logs the specified message and `Cause` at the trace log level.

**Signature**

```ts
export declare const logTraceCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logWarning

Logs the specified message at the warning log level.

**Signature**

```ts
export declare const logWarning: (message: string) => Stream<never, never, void>
```

Added in v1.0.0

## logWarningCause

Logs the specified `Cause` at the warning log level.

**Signature**

```ts
export declare const logWarningCause: <E>(cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

## logWarningCauseMessage

Logs the specified message and `Cause` at the warning log level.

**Signature**

```ts
export declare const logWarningCauseMessage: <E>(message: string, cause: Cause.Cause<E>) => Stream<never, never, void>
```

Added in v1.0.0

# mapping

## as

Maps the success values of this stream to the specified constant value.

**Signature**

```ts
export declare const as: <B>(value: B) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, B>
```

Added in v1.0.0

## map

Transforms the elements of this stream using the supplied function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, B>
```

Added in v1.0.0

## mapAccum

Statefully maps over the elements of this stream to produce new elements.

**Signature**

```ts
export declare const mapAccum: <S, A, A2>(
  s: S,
  f: (s: S, a: A) => readonly [S, A2]
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A2>
```

Added in v1.0.0

## mapAccumEffect

Statefully and effectfully maps over the elements of this stream to produce
new elements.

**Signature**

```ts
export declare const mapAccumEffect: <S, A, R2, E2, A2>(
  s: S,
  f: (s: S, a: A) => Effect.Effect<R2, E2, readonly [S, A2]>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapChunks

Transforms the chunks emitted by this stream.

**Signature**

```ts
export declare const mapChunks: <A, B>(
  f: (chunk: Chunk.Chunk<A>) => Chunk.Chunk<B>
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, B>
```

Added in v1.0.0

## mapChunksEffect

Effectfully transforms the chunks emitted by this stream.

**Signature**

```ts
export declare const mapChunksEffect: <A, R2, E2, B>(
  f: (chunk: Chunk.Chunk<A>) => Effect.Effect<R2, E2, Chunk.Chunk<B>>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, B>
```

Added in v1.0.0

## mapConcat

Maps each element to an iterable, and flattens the iterables into the
output of this stream.

**Signature**

```ts
export declare const mapConcat: <A, A2>(f: (a: A) => Iterable<A2>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A2>
```

Added in v1.0.0

## mapConcatChunk

Maps each element to a chunk, and flattens the chunks into the output of
this stream.

**Signature**

```ts
export declare const mapConcatChunk: <A, A2>(
  f: (a: A) => Chunk.Chunk<A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A2>
```

Added in v1.0.0

## mapConcatChunkEffect

Effectfully maps each element to a chunk, and flattens the chunks into the
output of this stream.

**Signature**

```ts
export declare const mapConcatChunkEffect: <A, R2, E2, A2>(
  f: (a: A) => Effect.Effect<R2, E2, Chunk.Chunk<A2>>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapConcatEffect

Effectfully maps each element to an iterable, and flattens the iterables
into the output of this stream.

**Signature**

```ts
export declare const mapConcatEffect: <A, R2, E2, A2>(
  f: (a: A) => Effect.Effect<R2, E2, Iterable<A2>>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapEffect

Maps over elements of the stream with the specified effectful function.

**Signature**

```ts
export declare const mapEffect: <A, R2, E2, A2>(
  f: (a: A) => Effect.Effect<R2, E2, A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapEffectPar

Maps over elements of the stream with the specified effectful function,
executing up to `n` invocations of `f` concurrently. Transformed elements
will be emitted in the original order.

**Signature**

```ts
export declare const mapEffectPar: (
  n: number
) => <A, R2, E2, A2>(
  f: (a: A) => Effect.Effect<R2, E2, A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapEffectParByKey

Maps over elements of the stream with the specified effectful function,
partitioned by `p` executing invocations of `f` concurrently. The number of
concurrent invocations of `f` is determined by the number of different
outputs of type `K`. Up to `buffer` elements may be buffered per partition.
Transformed elements may be reordered but the order within a partition is
maintained.

**Signature**

```ts
export declare const mapEffectParByKey: <A, K>(
  f: (a: A) => K,
  bufferSize?: number | undefined
) => <R2, E2, A2>(f: (a: A) => Effect.Effect<R2, E2, A2>) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapEffectParUnordered

Maps over elements of the stream with the specified effectful function,
executing up to `n` invocations of `f` concurrently. The element order is
not enforced by this combinator, and elements may be reordered.

**Signature**

```ts
export declare const mapEffectParUnordered: (
  n: number
) => <A, R2, E2, A2>(
  f: (a: A) => Effect.Effect<R2, E2, A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mapError

Transforms the errors emitted by this stream using `f`.

**Signature**

```ts
export declare const mapError: <E, E2>(f: (error: E) => E2) => <R, A>(self: Stream<R, E, A>) => Stream<R, E2, A>
```

Added in v1.0.0

## mapErrorCause

Transforms the full causes of failures emitted by this stream.

**Signature**

```ts
export declare const mapErrorCause: <E, E2>(
  f: (cause: Cause.Cause<E>) => Cause.Cause<E2>
) => <R, A>(self: Stream<R, E, A>) => Stream<R, E2, A>
```

Added in v1.0.0

# models

## Stream (interface)

A `Stream<R, E, A>` is a description of a program that, when evaluated, may
emit zero or more values of type `A`, may fail with errors of type `E`, and
uses an environment of type `R`. One way to think of `Stream` is as a
`Effect` program that could emit multiple values.

`Stream` is a purely functional _pull_ based stream. Pull based streams offer
inherent laziness and backpressure, relieving users of the need to manage
buffers between operators. As an optimization, `Stream` does not emit
single values, but rather an array of values. This allows the cost of effect
evaluation to be amortized.

`Stream` forms a monad on its `A` type parameter, and has error management
facilities for its `E` type parameter, modeled similarly to `Effect` (with
some adjustments for the multiple-valued nature of `Stream`). These aspects
allow for rich and expressive composition of streams.

**Signature**

```ts
export interface Stream<R, E, A> extends Stream.Variance<R, E, A> {
  /** @internal */
  readonly channel: Channel.Channel<R, unknown, unknown, unknown, E, Chunk.Chunk<A>, unknown>
}
```

Added in v1.0.0

# mutations

## absolve

Submerges the error case of an `Either` into the `Stream`.

**Signature**

```ts
export declare const absolve: <R, E, A>(self: Stream<R, E, Either.Either<E, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## aggregate

Aggregates elements of this stream using the provided sink for as long as
the downstream operators on the stream are busy.

This operator divides the stream into two asynchronous "islands". Operators
upstream of this operator run on one fiber, while downstream operators run
on another. Whenever the downstream fiber is busy processing elements, the
upstream fiber will feed elements into the sink until it signals
completion.

Any sink can be used here, but see `Sink.foldWeightedEffect` and
`Sink.foldUntilEffect` for sinks that cover the common usecases.

**Signature**

```ts
export declare const aggregate: <R2, E2, A, A2, B>(
  sink: Sink.Sink<R2, E2, A | A2, A2, B>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, B>
```

Added in v1.0.0

## aggregateWithin

Like `aggregateWithinEither`, but only returns the `Right` results.

**Signature**

```ts
export declare const aggregateWithin: <R2, E2, A, A2, B, R3, C>(
  sink: Sink.Sink<R2, E2, A | A2, A2, B>,
  schedule: Schedule.Schedule<R3, Option.Option<B>, C>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R3 | R, E2 | E, B>
```

Added in v1.0.0

## aggregateWithinEither

Aggregates elements using the provided sink until it completes, or until
the delay signalled by the schedule has passed.

This operator divides the stream into two asynchronous islands. Operators
upstream of this operator run on one fiber, while downstream operators run
on another. Elements will be aggregated by the sink until the downstream
fiber pulls the aggregated value, or until the schedule's delay has passed.

Aggregated elements will be fed into the schedule to determine the delays
between pulls.

**Signature**

```ts
export declare const aggregateWithinEither: <R2, E2, A, A2, B, R3, C>(
  sink: Sink.Sink<R2, E2, A | A2, A2, B>,
  schedule: Schedule.Schedule<R3, Option.Option<B>, C>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R3 | R, E2 | E, Either.Either<C, B>>
```

Added in v1.0.0

## broadcast

Fan out the stream, producing a list of streams that have the same elements
as this stream. The driver stream will only ever advance the `maximumLag`
chunks before the slowest downstream stream.

**Signature**

```ts
export declare const broadcast: <N extends number>(
  n: N,
  maximumLag: number
) => <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Stream.DynamicTuple<Stream<never, E, A>, N>>
```

Added in v1.0.0

## broadcastDynamic

Fan out the stream, producing a dynamic number of streams that have the
same elements as this stream. The driver stream will only ever advance the
`maximumLag` chunks before the slowest downstream stream.

**Signature**

```ts
export declare const broadcastDynamic: (
  maximumLag: number
) => <R, E, A>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R, never, Stream<never, E, A>>
```

Added in v1.0.0

## broadcastedQueues

Converts the stream to a scoped list of queues. Every value will be
replicated to every queue with the slowest queue being allowed to buffer
`maximumLag` chunks before the driver is back pressured.

Queues can unsubscribe from upstream by shutting down.

**Signature**

```ts
export declare const broadcastedQueues: <N extends number>(
  n: N,
  maximumLag: number
) => <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Stream.DynamicTuple<Queue.Dequeue<Take.Take<E, A>>, N>>
```

Added in v1.0.0

## broadcastedQueuesDynamic

Converts the stream to a scoped dynamic amount of queues. Every chunk will
be replicated to every queue with the slowest queue being allowed to buffer
`maximumLag` chunks before the driver is back pressured.

Queues can unsubscribe from upstream by shutting down.

**Signature**

```ts
export declare const broadcastedQueuesDynamic: (
  maximumLag: number
) => <R, E, A>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Effect.Effect<Scope.Scope, never, Queue.Dequeue<Take.Take<E, A>>>>
```

Added in v1.0.0

## buffer

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` elements in a queue.

**Signature**

```ts
export declare const buffer: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferChunks

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` chunks in a queue.

**Signature**

```ts
export declare const bufferChunks: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferChunksDropping

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` chunks in a dropping queue.

**Signature**

```ts
export declare const bufferChunksDropping: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferChunksSliding

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` chunks in a sliding queue.

**Signature**

```ts
export declare const bufferChunksSliding: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferDropping

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` elements in a dropping queue.

**Signature**

```ts
export declare const bufferDropping: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferSliding

Allows a faster producer to progress independently of a slower consumer by
buffering up to `capacity` elements in a sliding queue.

**Signature**

```ts
export declare const bufferSliding: (capacity: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## bufferUnbounded

Allows a faster producer to progress independently of a slower consumer by
buffering chunks into an unbounded queue.

**Signature**

```ts
export declare const bufferUnbounded: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## changes

Returns a new stream that only emits elements that are not equal to the
previous element emitted, using natural equality to determine whether two
elements are equal.

**Signature**

```ts
export declare const changes: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## changesWith

Returns a new stream that only emits elements that are not equal to the
previous element emitted, using the specified function to determine whether
two elements are equal.

**Signature**

```ts
export declare const changesWith: <A>(f: (x: A, y: A) => boolean) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## changesWithEffect

Returns a new stream that only emits elements that are not equal to the
previous element emitted, using the specified effectual function to
determine whether two elements are equal.

**Signature**

```ts
export declare const changesWithEffect: <A, R2, E2>(
  f: (x: A, y: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## chunks

Exposes the underlying chunks of the stream as a stream of chunks of
elements.

**Signature**

```ts
export declare const chunks: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## chunksWith

Performs the specified stream transformation with the chunk structure of
the stream exposed.

**Signature**

```ts
export declare const chunksWith: <R, E, A, R2, E2, A2>(
  f: (stream: Stream<R, E, Chunk.Chunk<A>>) => Stream<R2, E2, Chunk.Chunk<A2>>
) => (self: Stream<R, E, A>) => Stream<R | R2, E | E2, A2>
```

Added in v1.0.0

## collect

Performs a filter and map in a single step.

**Signature**

```ts
export declare const collect: <A, B>(pf: (a: A) => Option.Option<B>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, B>
```

Added in v1.0.0

## collectEffect

Performs an effectful filter and map in a single step.

**Signature**

```ts
export declare const collectEffect: <A, R2, E2, A2>(
  pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## collectLeft

Filters any `Right` values.

**Signature**

```ts
export declare const collectLeft: <R, E, E2, A>(self: Stream<R, E, Either.Either<E2, A>>) => Stream<R, E, E2>
```

Added in v1.0.0

## collectRight

Filters any `Left` values.

**Signature**

```ts
export declare const collectRight: <R, E, E2, A>(self: Stream<R, E, Either.Either<E2, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## collectSome

Filters any 'None' values.

**Signature**

```ts
export declare const collectSome: <R, E, A>(self: Stream<R, E, Option.Option<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## collectSuccess

Filters any `Exit.Failure` values.

**Signature**

```ts
export declare const collectSuccess: <R, E, E2, A>(self: Stream<R, E, Exit.Exit<E2, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## collectWhile

Transforms all elements of the stream for as long as the specified partial
function is defined.

**Signature**

```ts
export declare const collectWhile: <A, A2>(
  pf: (a: A) => Option.Option<A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A2>
```

Added in v1.0.0

## collectWhileEffect

Effectfully transforms all elements of the stream for as long as the
specified partial function is defined.

**Signature**

```ts
export declare const collectWhileEffect: <A, R2, E2, A2>(
  pf: (a: A) => Option.Option<Effect.Effect<R2, E2, A2>>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## collectWhileLeft

Terminates the stream when encountering the first `Right`.

**Signature**

```ts
export declare const collectWhileLeft: <R, E, E2, A>(self: Stream<R, E, Either.Either<E2, A>>) => Stream<R, E, E2>
```

Added in v1.0.0

## collectWhileRight

Terminates the stream when encountering the first `Left`.

**Signature**

```ts
export declare const collectWhileRight: <R, E, E2, A>(self: Stream<R, E, Either.Either<E2, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## collectWhileSome

Terminates the stream when encountering the first `None`.

**Signature**

```ts
export declare const collectWhileSome: <R, E, A>(self: Stream<R, E, Option.Option<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## collectWhileSuccess

Terminates the stream when encountering the first `Exit.Failure`.

**Signature**

```ts
export declare const collectWhileSuccess: <R, E, E2, A>(self: Stream<R, E, Exit.Exit<E2, A>>) => Stream<R, E, A>
```

Added in v1.0.0

## combine

Combines the elements from this stream and the specified stream by
repeatedly applying the function `f` to extract an element using both sides
and conceptually "offer" it to the destination stream. `f` can maintain
some internal state to control the combining process, with the initial
state being specified by `s`.

Where possible, prefer `Stream.combineChunks` for a more efficient
implementation.

**Signature**

```ts
export declare const combine: <R2, E2, A2, S, R3, E, A, R4, R5, A3>(
  that: Stream<R2, E2, A2>,
  s: S,
  f: (
    s: S,
    pullLeft: Effect.Effect<R3, Option.Option<E>, A>,
    pullRight: Effect.Effect<R4, Option.Option<E2>, A2>
  ) => Effect.Effect<R5, never, Exit.Exit<Option.Option<E2 | E>, readonly [A3, S]>>
) => <R>(self: Stream<R, E, A>) => Stream<R2 | R3 | R4 | R5 | R, E2 | E, A3>
```

Added in v1.0.0

## combineChunks

Combines the chunks from this stream and the specified stream by repeatedly
applying the function `f` to extract a chunk using both sides and
conceptually "offer" it to the destination stream. `f` can maintain some
internal state to control the combining process, with the initial state
being specified by `s`.

**Signature**

```ts
export declare const combineChunks: <R2, E2, A2, S, R3, E, A, R4, R5, A3>(
  that: Stream<R2, E2, A2>,
  s: S,
  f: (
    s: S,
    pullLeft: Effect.Effect<R3, Option.Option<E>, Chunk.Chunk<A>>,
    pullRight: Effect.Effect<R4, Option.Option<E2>, Chunk.Chunk<A2>>
  ) => Effect.Effect<R5, never, Exit.Exit<Option.Option<E2 | E>, readonly [Chunk.Chunk<A3>, S]>>
) => <R>(self: Stream<R, E, A>) => Stream<R2 | R3 | R4 | R5 | R, E2 | E, A3>
```

Added in v1.0.0

## concat

Concatenates the specified stream with this stream, resulting in a stream
that emits the elements from this stream and then the elements from the
specified stream.

**Signature**

```ts
export declare const concat: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## cross

Composes this stream with the specified stream to create a cartesian
product of elements. The `that` stream would be run multiple times, for
every element in the `this` stream.

See also `Stream.zip` for the more common point-wise variant.

**Signature**

```ts
export declare const cross: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, readonly [A, A2]>
```

Added in v1.0.0

## crossLeft

Composes this stream with the specified stream to create a cartesian
product of elements, but keeps only elements from this stream. The `that`
stream would be run multiple times, for every element in the `this` stream.

See also `Stream.zipLeft` for the more common point-wise variant.

**Signature**

```ts
export declare const crossLeft: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## crossRight

Composes this stream with the specified stream to create a cartesian
product of elements, but keeps only elements from the other stream. The
`that` stream would be run multiple times, for every element in the `this`
stream.

See also `Stream.zipRight` for the more common point-wise variant.

**Signature**

```ts
export declare const crossRight: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## crossWith

Composes this stream with the specified stream to create a cartesian
product of elements with a specified function. The `that` stream would be
run multiple times, for every element in the `this` stream.

See also `Stream.zipWith` for the more common point-wise variant.

**Signature**

```ts
export declare const crossWith: <R2, E2, B, A, C>(
  that: Stream<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, C>
```

Added in v1.0.0

## debounce

Delays the emission of values by holding new values for a set duration. If
no new values arrive during that time the value is emitted, however if a
new value is received during the holding period the previous value is
discarded and the process is repeated with the new value.

This operator is useful if you have a stream of "bursty" events which
eventually settle down and you only need the final event of the burst. For
example, a search engine may only want to initiate a search after a user
has paused typing so as to not prematurely recommend results.

**Signature**

```ts
export declare const debounce: (duration: Duration.Duration) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## distributedWith

More powerful version of `Stream.broadcast`. Allows to provide a function
that determines what queues should receive which elements. The decide
function will receive the indices of the queues in the resulting list.

**Signature**

```ts
export declare const distributedWith: <N extends number, A>(
  n: N,
  maximumLag: number,
  decide: (a: A) => Effect.Effect<never, never, Predicate<number>>
) => <R, E>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, never, Stream.DynamicTuple<Queue.Dequeue<Exit.Exit<Option.Option<E>, A>>, N>>
```

Added in v1.0.0

## distributedWithDynamic

More powerful version of `Stream.distributedWith`. This returns a function
that will produce new queues and corresponding indices. You can also
provide a function that will be executed after the final events are
enqueued in all queues. Shutdown of the queues is handled by the driver.
Downstream users can also shutdown queues manually. In this case the driver
will continue but no longer backpressure on them.

**Signature**

```ts
export declare const distributedWithDynamic: <E, A, _>(
  maximumLag: number,
  decide: (a: A) => Effect.Effect<never, never, Predicate<number>>,
  done?: ((exit: Exit.Exit<Option.Option<E>, never>) => Effect.Effect<never, never, _>) | undefined
) => <R>(
  self: Stream<R, E, A>
) => Effect.Effect<
  Scope.Scope | R,
  never,
  Effect.Effect<never, never, readonly [number, Queue.Dequeue<Exit.Exit<Option.Option<E>, A>>]>
>
```

Added in v1.0.0

## drain

Converts this stream to a stream that executes its effects but emits no
elements. Useful for sequencing effects using streams:

**Signature**

```ts
export declare const drain: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, never>
```

Added in v1.0.0

## drainFork

Drains the provided stream in the background for as long as this stream is
running. If this stream ends before `other`, `other` will be interrupted.
If `other` fails, this stream will fail with that error.

**Signature**

```ts
export declare const drainFork: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## drop

Drops the specified number of elements from this stream.

**Signature**

```ts
export declare const drop: (n: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## dropRight

Drops the last specified number of elements from this stream.

**Signature**

```ts
export declare const dropRight: (n: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## dropUntil

Drops all elements of the stream until the specified predicate evaluates to
`true`.

**Signature**

```ts
export declare const dropUntil: <A>(predicate: Predicate<A>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## dropUntilEffect

Drops all elements of the stream until the specified effectful predicate
evaluates to `true`.

**Signature**

```ts
export declare const dropUntilEffect: <A, R2, E2>(
  predicate: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## dropWhile

Drops all elements of the stream for as long as the specified predicate
evaluates to `true`.

**Signature**

```ts
export declare const dropWhile: <A>(f: Predicate<A>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## dropWhileEffect

Drops all elements of the stream for as long as the specified predicate
produces an effect that evalutates to `true`

**Signature**

```ts
export declare const dropWhileEffect: <A, R2, E2>(
  predicate: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## either

Returns a stream whose failures and successes have been lifted into an
`Either`. The resulting stream cannot fail, because the failures have been
exposed as part of the `Either` success case.

**Signature**

```ts
export declare const either: <R, E, A>(self: Stream<R, E, A>) => Stream<R, never, Either.Either<E, A>>
```

Added in v1.0.0

## ensuring

Executes the provided finalizer after this stream's finalizers run.

**Signature**

```ts
export declare const ensuring: <R2, _>(
  finalizer: Effect.Effect<R2, never, _>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, A>
```

Added in v1.0.0

## forever

Repeats this stream forever.

**Signature**

```ts
export declare const forever: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## groupByKey

Partition a stream using a function and process each stream individually.
This returns a data structure that can be used to further filter down which
groups shall be processed.

After calling apply on the GroupBy object, the remaining groups will be
processed in parallel and the resulting streams merged in a
nondeterministic fashion.

Up to `buffer` elements may be buffered in any group stream before the
producer is backpressured. Take care to consume from all streams in order
to prevent deadlocks.

For example, to collect the first 2 words for every starting letter from a
stream of words:

```ts
import * as GroupBy from '@effect/stream/GroupBy'
import * as Stream from '@effect/stream/Stream'
import { pipe } from '@fp-ts/data/Function'

pipe(
  Stream.fromIterable(['hello', 'world', 'hi', 'holla']),
  Stream.groupByKey((word) => word[0]),
  GroupBy.evaluate((key, stream) =>
    pipe(
      stream,
      Stream.take(2),
      Stream.map((words) => [key, words] as const)
    )
  )
)
```

**Signature**

```ts
export declare const groupByKey: <A, K>(
  f: (a: A) => K,
  bufferSize?: number | undefined
) => <R, E>(self: Stream<R, E, A>) => GroupBy.GroupBy<R, E, K, A>
```

Added in v1.0.0

## grouped

Partitions the stream with specified `chunkSize`.

**Signature**

```ts
export declare const grouped: (chunkSize: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## groupedWithin

Partitions the stream with the specified `chunkSize` or until the specified
`duration` has passed, whichever is satisfied first.

**Signature**

```ts
export declare const groupedWithin: (
  chunkSize: number,
  duration: Duration.Duration
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## haltAfter

Specialized version of haltWhen which halts the evaluation of this stream
after the given duration.

An element in the process of being pulled will not be interrupted when the
given duration completes. See `interruptAfter` for this behavior.

**Signature**

```ts
export declare const haltAfter: (duration: Duration.Duration) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## haltWhen

Halts the evaluation of this stream when the provided effect completes. The
given effect will be forked as part of the returned stream, and its success
will be discarded.

An element in the process of being pulled will not be interrupted when the
effect completes. See `interruptWhen` for this behavior.

If the effect completes with a failure, the stream will emit that failure.

**Signature**

```ts
export declare const haltWhen: <R2, E2, _>(
  effect: Effect.Effect<R2, E2, _>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## haltWhenDeferred

Halts the evaluation of this stream when the provided promise resolves.

If the promise completes with a failure, the stream will emit that failure.

**Signature**

```ts
export declare const haltWhenDeferred: <E2, _>(
  deferred: Deferred.Deferred<E2, _>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, A>
```

Added in v1.0.0

## identity

The identity pipeline, which does not modify streams in any way.

**Signature**

```ts
export declare const identity: <R, E, A>() => Stream<R, E, A>
```

Added in v1.0.0

## interleave

Interleaves this stream and the specified stream deterministically by
alternating pulling values from this stream and the specified stream. When
one stream is exhausted all remaining values in the other stream will be
pulled.

**Signature**

```ts
export declare const interleave: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## interleaveWith

Combines this stream and the specified stream deterministically using the
stream of boolean values `pull` to control which stream to pull from next.
A value of `true` indicates to pull from this stream and a value of `false`
indicates to pull from the specified stream. Only consumes as many elements
as requested by the `pull` stream. If either this stream or the specified
stream are exhausted further requests for values from that stream will be
ignored.

**Signature**

```ts
export declare const interleaveWith: <R2, E2, A2, R3, E3>(
  that: Stream<R2, E2, A2>,
  decider: Stream<R3, E3, boolean>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R3 | R, E2 | E3 | E, A2 | A>
```

Added in v1.0.0

## interruptAfter

Specialized version of `Stream.interruptWhen` which interrupts the
evaluation of this stream after the given `Duration`.

**Signature**

```ts
export declare const interruptAfter: (
  duration: Duration.Duration
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## interruptWhen

Interrupts the evaluation of this stream when the provided effect
completes. The given effect will be forked as part of this stream, and its
success will be discarded. This combinator will also interrupt any
in-progress element being pulled from upstream.

If the effect completes with a failure before the stream completes, the
returned stream will emit that failure.

**Signature**

```ts
export declare const interruptWhen: <R2, E2, _>(
  effect: Effect.Effect<R2, E2, _>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## interruptWhenDeferred

Interrupts the evaluation of this stream when the provided promise
resolves. This combinator will also interrupt any in-progress element being
pulled from upstream.

If the promise completes with a failure, the stream will emit that failure.

**Signature**

```ts
export declare const interruptWhenDeferred: <E2, _>(
  deferred: Deferred.Deferred<E2, _>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, A>
```

Added in v1.0.0

## intersperse

Intersperse stream with provided `element`.

**Signature**

```ts
export declare const intersperse: <A2>(element: A2) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A2 | A>
```

Added in v1.0.0

## intersperseAffixes

Intersperse the specified element, also adding a prefix and a suffix.

**Signature**

```ts
export declare const intersperseAffixes: <A2, A3, A4>(
  start: A2,
  middle: A3,
  end: A4
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A2 | A3 | A4 | A>
```

Added in v1.0.0

## mapBoth

Returns a stream whose failure and success channels have been mapped by the
specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, E2, A, A2>(
  f: (e: E) => E2,
  g: (a: A) => A2
) => <R>(self: Stream<R, E, A>) => Stream<R, E2, A2>
```

Added in v1.0.0

## merge

Merges this stream and the specified stream together.

New produced stream will terminate when both specified stream terminate if
no termination strategy is specified.

**Signature**

```ts
export declare const merge: <R2, E2, A2>(
  that: Stream<R2, E2, A2>,
  strategy?: HaltStrategy.Left | HaltStrategy.Right | HaltStrategy.Both | HaltStrategy.Either | undefined
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## mergeAll

Merges a variable list of streams in a non-deterministic fashion. Up to `n`
streams may be consumed in parallel and up to `outputBuffer` chunks may be
buffered by this operator.

**Signature**

```ts
export declare const mergeAll: (
  n: number,
  bufferSize?: number | undefined
) => <R, E, A>(...streams: Stream<R, E, A>[]) => Stream<R, E, A>
```

Added in v1.0.0

## mergeAllUnbounded

Like `Stream.mergeAll`, but runs all streams concurrently.

**Signature**

```ts
export declare const mergeAllUnbounded: (
  bufferSize?: number | undefined
) => <R, E, A>(...streams: Stream<R, E, A>[]) => Stream<R, E, A>
```

Added in v1.0.0

## mergeEither

Merges this stream and the specified stream together to produce a stream of
eithers.

**Signature**

```ts
export declare const mergeEither: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, Either.Either<A, A2>>
```

Added in v1.0.0

## mergeHaltEither

Merges this stream and the specified stream together. New produced stream
will terminate when either stream terminates.

**Signature**

```ts
export declare const mergeHaltEither: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## mergeHaltLeft

Merges this stream and the specified stream together. New produced stream
will terminate when this stream terminates.

**Signature**

```ts
export declare const mergeHaltLeft: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## mergeHaltRight

Merges this stream and the specified stream together. New produced stream
will terminate when the specified stream terminates.

**Signature**

```ts
export declare const mergeHaltRight: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## mergeLeft

Merges this stream and the specified stream together, discarding the values
from the right stream.

**Signature**

```ts
export declare const mergeLeft: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## mergeRight

Merges this stream and the specified stream together, discarding the values
from the left stream.

**Signature**

```ts
export declare const mergeRight: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## mergeWith

Merges this stream and the specified stream together to a common element
type with the specified mapping functions.

New produced stream will terminate when both specified stream terminate if
no termination strategy is specified.

**Signature**

```ts
export declare const mergeWith: <R2, E2, A2, A, A3, A4>(
  that: Stream<R2, E2, A2>,
  left: (a: A) => A3,
  right: (a2: A2) => A4,
  strategy?: HaltStrategy.Left | HaltStrategy.Right | HaltStrategy.Both | HaltStrategy.Either | undefined
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A3 | A4>
```

Added in v1.0.0

## mkString

Returns a combined string resulting from concatenating each of the values
from the stream.

**Signature**

```ts
export declare const mkString: <R, E>(self: Stream<R, E, string>) => Effect.Effect<R, E, string>
```

Added in v1.0.0

## onError

Runs the specified effect if this stream fails, providing the error to the
effect if it exists.

Note: Unlike `Effect.onError` there is no guarantee that the provided
effect will not be interrupted.

**Signature**

```ts
export declare const onError: <E, R2, _>(
  cleanup: (cause: Cause.Cause<E>) => Effect.Effect<R2, never, _>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, A>
```

Added in v1.0.0

## partition

Partition a stream using a predicate. The first stream will contain all
element evaluated to true and the second one will contain all element
evaluated to false. The faster stream may advance by up to buffer elements
further than the slower one.

**Signature**

```ts
export declare const partition: <A>(
  predicate: Predicate<A>,
  bufferSize?: number | undefined
) => <R, E>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R, E, readonly [Stream<never, E, A>, Stream<never, E, A>]>
```

Added in v1.0.0

## partitionEither

Split a stream by an effectful predicate. The faster stream may advance by
up to buffer elements further than the slower one.

**Signature**

```ts
export declare const partitionEither: <A, R2, E2, A2, A3>(
  predicate: (a: A) => Effect.Effect<R2, E2, Either.Either<A2, A3>>,
  bufferSize?: number | undefined
) => <R, E>(
  self: Stream<R, E, A>
) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, readonly [Stream<never, E2 | E, A2>, Stream<never, E2 | E, A3>]>
```

Added in v1.0.0

## peel

Peels off enough material from the stream to construct a `Z` using the
provided `Sink` and then returns both the `Z` and the rest of the
`Stream` in a scope. Like all scoped values, the provided stream is
valid only within the scope.

**Signature**

```ts
export declare const peel: <R2, E2, A, Z>(
  sink: Sink.Sink<R2, E2, A, A, Z>
) => <R, E>(self: Stream<R, E, A>) => Effect.Effect<Scope.Scope | R2 | R, E2 | E, readonly [Z, Stream<never, E, A>]>
```

Added in v1.0.0

## pipeThrough

Pipes all of the values from this stream through the provided sink.

See also `Stream.transduce`.

**Signature**

```ts
export declare const pipeThrough: <R2, E2, A, L, Z>(
  sink: Sink.Sink<R2, E2, A, L, Z>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, L>
```

Added in v1.0.0

## pipeThroughChannel

Pipes all the values from this stream through the provided channel.

**Signature**

```ts
export declare const pipeThroughChannel: <R2, E, E2, A, A2>(
  channel: Channel.Channel<R2, E, Chunk.Chunk<A>, unknown, E2, Chunk.Chunk<A2>, unknown>
) => <R>(self: Stream<R, E, A>) => Stream<R2 | R, E2, A2>
```

Added in v1.0.0

## pipeThroughChannelOrFail

Pipes all values from this stream through the provided channel, passing
through any error emitted by this stream unchanged.

**Signature**

```ts
export declare const pipeThroughChannelOrFail: <R2, E, E2, A, A2>(
  channel: Channel.Channel<R2, E, Chunk.Chunk<A>, unknown, E2, Chunk.Chunk<A2>, unknown>
) => <R>(self: Stream<R, E, A>) => Stream<R2 | R, E | E2, A2>
```

Added in v1.0.0

## prepend

Emits the provided chunk before emitting any other value.

**Signature**

```ts
export declare const prepend: <A>(values: Chunk.Chunk<A>) => Stream<never, never, A>
```

Added in v1.0.0

## rechunk

Re-chunks the elements of the stream into chunks of `n` elements each. The
last chunk might contain less than `n` elements.

**Signature**

```ts
export declare const rechunk: (n: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## repeat

Repeats the entire stream using the specified schedule. The stream will
execute normally, and then repeat again according to the provided schedule.

**Signature**

```ts
export declare const repeat: <R2, B>(
  schedule: Schedule.Schedule<R2, unknown, B>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, A>
```

Added in v1.0.0

## repeatEither

Repeats the entire stream using the specified schedule. The stream will
execute normally, and then repeat again according to the provided schedule.
The schedule output will be emitted at the end of each repetition.

**Signature**

```ts
export declare const repeatEither: <R2, B>(
  schedule: Schedule.Schedule<R2, unknown, B>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, Either.Either<B, A>>
```

Added in v1.0.0

## repeatElements

Repeats each element of the stream using the provided schedule. Repetitions
are done in addition to the first execution, which means using
`Schedule.recurs(1)` actually results in the original effect, plus an
additional recurrence, for a total of two repetitions of each value in the
stream.

**Signature**

```ts
export declare const repeatElements: <R2, B>(
  schedule: Schedule.Schedule<R2, unknown, B>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, A>
```

Added in v1.0.0

## repeatElementsEither

Repeats each element of the stream using the provided schedule. When the
schedule is finished, then the output of the schedule will be emitted into
the stream. Repetitions are done in addition to the first execution, which
means using `Schedule.recurs(1)` actually results in the original effect,
plus an additional recurrence, for a total of two repetitions of each value
in the stream.

**Signature**

```ts
export declare const repeatElementsEither: <R2, B>(
  schedule: Schedule.Schedule<R2, unknown, B>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, Either.Either<B, A>>
```

Added in v1.0.0

## repeatElementsWith

Repeats each element of the stream using the provided schedule. When the
schedule is finished, then the output of the schedule will be emitted into
the stream. Repetitions are done in addition to the first execution, which
means using `Schedule.recurs(1)` actually results in the original effect,
plus an additional recurrence, for a total of two repetitions of each value
in the stream.

This function accepts two conversion functions, which allow the output of
this stream and the output of the provided schedule to be unified into a
single type. For example, `Either` or similar data type.

**Signature**

```ts
export declare const repeatElementsWith: <R2, B, A, C>(
  schedule: Schedule.Schedule<R2, unknown, B>,
  f: (a: A) => C,
  g: (b: B) => C
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E, C>
```

Added in v1.0.0

## repeatWith

Repeats the entire stream using the specified schedule. The stream will
execute normally, and then repeat again according to the provided schedule.
The schedule output will be emitted at the end of each repetition and can
be unified with the stream elements using the provided functions.

**Signature**

```ts
export declare const repeatWith: <R2, B, A, C>(
  schedule: Schedule.Schedule<R2, unknown, B>,
  f: (a: A) => C,
  g: (b: B) => C
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E, C>
```

Added in v1.0.0

## retry

When the stream fails, retry it according to the given schedule

This retries the entire stream, so will re-execute all of the stream's
acquire operations.

The schedule is reset as soon as the first element passes through the
stream again.

**Signature**

```ts
export declare const retry: <R2, E, _>(
  schedule: Schedule.Schedule<R2, E, _>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E, A>
```

Added in v1.0.0

## right

Fails with the error `None` if value is `Left`.

**Signature**

```ts
export declare const right: <R, E, A, A2>(self: Stream<R, E, Either.Either<A, A2>>) => Stream<R, Option.Option<E>, A2>
```

Added in v1.0.0

## rightOrFail

Fails with given error 'e' if value is `Left`.

**Signature**

```ts
export declare const rightOrFail: <E2>(
  error: LazyArg<E2>
) => <R, E, A, A2>(self: Stream<R, E, Either.Either<A, A2>>) => Stream<R, E2 | E, A2>
```

Added in v1.0.0

## scan

Statefully maps over the elements of this stream to produce all
intermediate results of type `S` given an initial S.

**Signature**

```ts
export declare const scan: <S, A>(s: S, f: (s: S, a: A) => S) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, S>
```

Added in v1.0.0

## scanEffect

Statefully and effectfully maps over the elements of this stream to produce
all intermediate results of type `S` given an initial S.

**Signature**

```ts
export declare const scanEffect: <S, A, R2, E2>(
  s: S,
  f: (s: S, a: A) => Effect.Effect<R2, E2, S>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, S>
```

Added in v1.0.0

## scanReduce

Statefully maps over the elements of this stream to produce all
intermediate results.

See also `Stream.scan`.

**Signature**

```ts
export declare const scanReduce: <A2, A>(
  f: (a2: A2 | A, a: A) => A2
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A2 | A>
```

Added in v1.0.0

## scanReduceEffect

Statefully and effectfully maps over the elements of this stream to produce
all intermediate results.

See also `Stream.scanEffect`.

**Signature**

```ts
export declare const scanReduceEffect: <A2, A, R2, E2>(
  f: (a2: A2 | A, a: A) => Effect.Effect<R2, E2, A2 | A>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## scheduleWith

Schedules the output of the stream using the provided `schedule` and emits
its output at the end (if `schedule` is finite). Uses the provided function
to align the stream and schedule outputs on the same type.

**Signature**

```ts
export declare const scheduleWith: <R2, A, B, C>(
  schedule: Schedule.Schedule<R2, A, B>,
  f: (a: A) => C,
  g: (b: B) => C
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E, C>
```

Added in v1.0.0

## sliding

Emits a sliding window of `n` elements.

```ts
import * as Stream from '@effect/stream/Stream'
import { pipe } from '@fp-ts/data/Function'

pipe(Stream.make(1, 2, 3, 4), Stream.sliding(2), Stream.runCollect)
// => Chunk(Chunk(1, 2), Chunk(2, 3), Chunk(3, 4))
```

**Signature**

```ts
export declare const sliding: (
  chunkSize: number,
  stepSize?: number | undefined
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## some

Converts an option on values into an option on errors.

**Signature**

```ts
export declare const some: <R, E, A>(self: Stream<R, E, Option.Option<A>>) => Stream<R, Option.Option<E>, A>
```

Added in v1.0.0

## someOrElse

Extracts the optional value, or returns the given 'default'.

**Signature**

```ts
export declare const someOrElse: <A2>(
  fallback: LazyArg<A2>
) => <R, E, A>(self: Stream<R, E, Option.Option<A>>) => Stream<R, E, A2 | A>
```

Added in v1.0.0

## someOrFail

Extracts the optional value, or fails with the given error 'e'.

**Signature**

```ts
export declare const someOrFail: <E2>(
  error: LazyArg<E2>
) => <R, E, A>(self: Stream<R, E, Option.Option<A>>) => Stream<R, E2 | E, A>
```

Added in v1.0.0

## split

Splits elements based on a predicate.

```ts
import * as Stream from '@effect/stream/Stream'
import { pipe } from '@fp-ts/data/Function'

pipe(
  Stream.range(1, 10),
  Stream.split((n) => n % 4 === 0),
  Stream.runCollect
)
// => Chunk(Chunk(1, 2, 3), Chunk(5, 6, 7), Chunk(9))
```

**Signature**

```ts
export declare const split: <A>(
  predicate: Predicate<A>
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## splitOnChunk

Splits elements on a delimiter and transforms the splits into desired output.

**Signature**

```ts
export declare const splitOnChunk: <A>(
  delimiter: Chunk.Chunk<A>
) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, Chunk.Chunk<A>>
```

Added in v1.0.0

## take

Takes the specified number of elements from this stream.

**Signature**

```ts
export declare const take: (n: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## takeRight

Takes the last specified number of elements from this stream.

**Signature**

```ts
export declare const takeRight: (n: number) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## takeUntil

Takes all elements of the stream until the specified predicate evaluates to
`true`.

**Signature**

```ts
export declare const takeUntil: <A>(predicate: Predicate<A>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## takeUntilEffect

Takes all elements of the stream until the specified effectual predicate
evaluates to `true`.

**Signature**

```ts
export declare const takeUntilEffect: <A, R2, E2>(
  predicate: (a: A) => Effect.Effect<R2, E2, boolean>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## takeWhile

Takes all elements of the stream for as long as the specified predicate
evaluates to `true`.

**Signature**

```ts
export declare const takeWhile: <A>(predicate: Predicate<A>) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## tapErrorCause

Returns a stream that effectfully "peeks" at the cause of failure of the
stream.

**Signature**

```ts
export declare const tapErrorCause: <E, R2, E2, _>(
  f: (cause: Cause.Cause<E>) => Effect.Effect<R2, E2, _>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E | E2, A>
```

Added in v1.0.0

## throttleEnforce

Throttles the chunks of this stream according to the given bandwidth
parameters using the token bucket algorithm. Allows for burst in the
processing of elements by allowing the token bucket to accumulate tokens up
to a `units + burst` threshold. Chunks that do not meet the bandwidth
constraints are dropped. The weight of each chunk is determined by the
`costFn` function.

**Signature**

```ts
export declare const throttleEnforce: (
  units: number,
  duration: Duration.Duration,
  burst?: number | undefined
) => <A>(costFn: (chunk: Chunk.Chunk<A>) => number) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## throttleEnforceEffect

Throttles the chunks of this stream according to the given bandwidth
parameters using the token bucket algorithm. Allows for burst in the
processing of elements by allowing the token bucket to accumulate tokens up
to a `units + burst` threshold. Chunks that do not meet the bandwidth
constraints are dropped. The weight of each chunk is determined by the
`costFn` effectful function.

**Signature**

```ts
export declare const throttleEnforceEffect: (
  units: number,
  duration: Duration.Duration,
  burst?: number | undefined
) => <A, R2, E2>(
  costFn: (chunk: Chunk.Chunk<A>) => Effect.Effect<R2, E2, number>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## throttleShape

Delays the chunks of this stream according to the given bandwidth
parameters using the token bucket algorithm. Allows for burst in the
processing of elements by allowing the token bucket to accumulate tokens up
to a `units + burst` threshold. The weight of each chunk is determined by
the `costFn` function.

**Signature**

```ts
export declare const throttleShape: (
  units: number,
  duration: Duration.Duration,
  burst?: number | undefined
) => <A>(costFn: (chunk: Chunk.Chunk<A>) => number) => <R, E>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## throttleShapeEffect

Delays the chunks of this stream according to the given bandwidth
parameters using the token bucket algorithm. Allows for burst in the
processing of elements by allowing the token bucket to accumulate tokens up
to a `units + burst` threshold. The weight of each chunk is determined by
the `costFn` effectful function.

**Signature**

```ts
export declare const throttleShapeEffect: (
  units: number,
  duration: Duration.Duration,
  burst?: number | undefined
) => <A, R2, E2>(
  costFn: (chunk: Chunk.Chunk<A>) => Effect.Effect<R2, E2, number>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## timeout

Ends the stream if it does not produce a value after the specified duration.

**Signature**

```ts
export declare const timeout: (duration: Duration.Duration) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## timeoutFail

Fails the stream with given error if it does not produce a value after d
duration.

**Signature**

```ts
export declare const timeoutFail: <E2>(
  error: LazyArg<E2>,
  duration: Duration.Duration
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, A>
```

Added in v1.0.0

## timeoutFailCause

Fails the stream with given cause if it does not produce a value after d
duration.

**Signature**

```ts
export declare const timeoutFailCause: <E2>(
  cause: LazyArg<Cause.Cause<E2>>,
  duration: Duration.Duration
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, A>
```

Added in v1.0.0

## timeoutTo

Switches the stream if it does not produce a value after the specified
duration.

**Signature**

```ts
export declare const timeoutTo: <R2, E2, A2>(
  duration: Duration.Duration,
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2 | A>
```

Added in v1.0.0

## transduce

Applies the transducer to the stream and emits its outputs.

**Signature**

```ts
export declare const transduce: <R2, E2, A, Z>(
  sink: Sink.Sink<R2, E2, A, A, Z>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, Z>
```

Added in v1.0.0

## when

Returns the specified stream if the given condition is satisfied, otherwise
returns an empty stream.

**Signature**

```ts
export declare const when: (predicate: LazyArg<boolean>) => <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, A>
```

Added in v1.0.0

## whenCaseEffect

Returns the stream when the given partial function is defined for the given
effectful value, otherwise returns an empty stream.

**Signature**

```ts
export declare const whenCaseEffect: <A, R2, E2, A2>(
  pf: (a: A) => Option.Option<Stream<R2, E2, A2>>
) => <R, E>(self: Effect.Effect<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## whenEffect

Returns the stream if the given effectful condition is satisfied, otherwise
returns an empty stream.

**Signature**

```ts
export declare const whenEffect: <R2, E2>(
  effect: Effect.Effect<R2, E2, boolean>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

# sequencing

## branchAfter

Returns a `Stream` that first collects `n` elements from the input `Stream`,
and then creates a new `Stream` using the specified function, and sends all
the following elements through that.

**Signature**

```ts
export declare const branchAfter: <A, R2, E2, A2>(
  n: number,
  f: (input: Chunk.Chunk<A>) => Stream<R2, E2, A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## flatMap

Returns a stream made of the concatenation in strict order of all the
streams produced by passing each element of this stream to `f0`

**Signature**

```ts
export declare const flatMap: <A, R2, E2, A2>(
  f: (a: A) => Stream<R2, E2, A2>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## flatMapPar

Maps each element of this stream to another stream and returns the
non-deterministic merge of those streams, executing up to `n` inner streams
concurrently. Up to `bufferSize` elements of the produced streams may be
buffered in memory by this operator.

**Signature**

```ts
export declare const flatMapPar: (
  n: number,
  bufferSize?: number | undefined
) => <A, R2, E2, A2>(f: (a: A) => Stream<R2, E2, A2>) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## flatMapParSwitch

Maps each element of this stream to another stream and returns the
non-deterministic merge of those streams, executing up to `n` inner streams
concurrently. When a new stream is created from an element of the source
stream, the oldest executing stream is cancelled. Up to `bufferSize`
elements of the produced streams may be buffered in memory by this
operator.

**Signature**

```ts
export declare const flatMapParSwitch: (
  n: number,
  bufferSize?: number | undefined
) => <A, R2, E2, A2>(f: (a: A) => Stream<R2, E2, A2>) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## flatten

Flattens this stream-of-streams into a stream made of the concatenation in
strict order of all the streams.

**Signature**

```ts
export declare const flatten: <R, E, R2, E2, A>(self: Stream<R, E, Stream<R2, E2, A>>) => Stream<R | R2, E | E2, A>
```

Added in v1.0.0

## flattenChunks

Submerges the chunks carried by this stream into the stream's structure,
while still preserving them.

**Signature**

```ts
export declare const flattenChunks: <R, E, A>(self: Stream<R, E, Chunk.Chunk<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## flattenEffect

Flattens `Effect` values into the stream's structure, preserving all
information about the effect.

**Signature**

```ts
export declare const flattenEffect: <R, E, R2, E2, A>(
  self: Stream<R, E, Effect.Effect<R2, E2, A>>
) => Stream<R | R2, E | E2, A>
```

Added in v1.0.0

## flattenExit

Flattens `Exit` values. `Exit.Failure` values translate to stream
failures while `Exit.Success` values translate to stream elements.

**Signature**

```ts
export declare const flattenExit: <R, E, E2, A>(self: Stream<R, E, Exit.Exit<E2, A>>) => Stream<R, E | E2, A>
```

Added in v1.0.0

## flattenExitOption

Unwraps `Exit` values that also signify end-of-stream by failing with `None`.

For `Exit` values that do not signal end-of-stream, prefer:

```ts
stream.mapZIO(ZIO.done(_))
```

**Signature**

```ts
export declare const flattenExitOption: <R, E, E2, A>(
  self: Stream<R, E, Exit.Exit<Option.Option<E2>, A>>
) => Stream<R, E | E2, A>
```

Added in v1.0.0

## flattenIterables

Submerges the iterables carried by this stream into the stream's structure,
while still preserving them.

**Signature**

```ts
export declare const flattenIterables: <R, E, A>(self: Stream<R, E, Iterable<A>>) => Stream<R, E, A>
```

Added in v1.0.0

## flattenPar

Flattens a stream of streams into a stream by executing a non-deterministic
concurrent merge. Up to `n` streams may be consumed in parallel and up to
`outputBuffer` elements may be buffered by this operator.

**Signature**

```ts
export declare const flattenPar: (
  n: number,
  bufferSize?: number | undefined
) => <R, E, R2, E2, A>(self: Stream<R, E, Stream<R2, E2, A>>) => Stream<R | R2, E | E2, A>
```

Added in v1.0.0

## flattenParUnbounded

Like `Stream.flattenPar`, but executes all streams concurrently.

**Signature**

```ts
export declare const flattenParUnbounded: (
  bufferSize?: number | undefined
) => <R, E, R2, E2, A>(self: Stream<R, E, Stream<R2, E2, A>>) => Stream<R | R2, E | E2, A>
```

Added in v1.0.0

## flattenTake

Unwraps `Exit` values and flatten chunks that also signify end-of-stream
by failing with `None`.

**Signature**

```ts
export declare const flattenTake: <R, E, E2, A>(self: Stream<R, E, Take.Take<E2, A>>) => Stream<R, E | E2, A>
```

Added in v1.0.0

## tap

Adds an effect to consumption of every element of the stream.

**Signature**

```ts
export declare const tap: <A, R2, E2, _>(
  f: (a: A) => Effect.Effect<R2, E2, _>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## tapError

Returns a stream that effectfully "peeks" at the failure of the stream.

**Signature**

```ts
export declare const tapError: <E, R2, E2, _>(
  f: (error: E) => Effect.Effect<R2, E2, _>
) => <R, A>(self: Stream<R, E, A>) => Stream<R2 | R, E | E2, A>
```

Added in v1.0.0

## tapSink

Sends all elements emitted by this stream to the specified sink in addition
to emitting them.

**Signature**

```ts
export declare const tapSink: <R2, E2, A>(
  sink: Sink.Sink<R2, E2, A, unknown, unknown>
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

# symbols

## StreamTypeId

**Signature**

```ts
export declare const StreamTypeId: typeof StreamTypeId
```

Added in v1.0.0

## StreamTypeId (type alias)

**Signature**

```ts
export type StreamTypeId = typeof StreamTypeId
```

Added in v1.0.0

# zipping

## zip

Zips this stream with another point-wise and emits tuples of elements from
both streams.

The new stream will end when one of the sides ends.

**Signature**

```ts
export declare const zip: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, readonly [A, A2]>
```

Added in v1.0.0

## zipAll

Zips this stream with another point-wise, creating a new stream of pairs of
elements from both sides.

The defaults `defaultLeft` and `defaultRight` will be used if the streams
have different lengths and one of the streams has ended before the other.

**Signature**

```ts
export declare const zipAll: <R2, E2, A2, A>(
  that: Stream<R2, E2, A2>,
  defaultLeft: A,
  defaultRight: A2
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, readonly [A, A2]>
```

Added in v1.0.0

## zipAllLeft

Zips this stream with another point-wise, and keeps only elements from this
stream.

The provided default value will be used if the other stream ends before
this one.

**Signature**

```ts
export declare const zipAllLeft: <R2, E2, A2, A>(
  that: Stream<R2, E2, A2>,
  defaultLeft: A
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## zipAllRight

Zips this stream with another point-wise, and keeps only elements from the
other stream.

The provided default value will be used if this stream ends before the
other one.

**Signature**

```ts
export declare const zipAllRight: <R2, E2, A2>(
  that: Stream<R2, E2, A2>,
  defaultRight: A2
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## zipAllSortedByKey

Zips this stream that is sorted by distinct keys and the specified stream
that is sorted by distinct keys to produce a new stream that is sorted by
distinct keys. Combines values associated with each key into a tuple,
using the specified values `defaultLeft` and `defaultRight` to fill in
missing values.

This allows zipping potentially unbounded streams of data by key in
constant space but the caller is responsible for ensuring that the
streams are sorted by distinct keys.

**Signature**

```ts
export declare const zipAllSortedByKey: <K>(
  order: Order.Order<K>
) => <R2, E2, A2, A>(
  that: Stream<R2, E2, readonly [K, A2]>,
  defaultLeft: A,
  defaultRight: A2
) => <R, E>(self: Stream<R, E, readonly [K, A]>) => Stream<R2 | R, E2 | E, readonly [K, readonly [A, A2]]>
```

Added in v1.0.0

## zipAllSortedByKeyLeft

Zips this stream that is sorted by distinct keys and the specified stream
that is sorted by distinct keys to produce a new stream that is sorted by
distinct keys. Keeps only values from this stream, using the specified
value `default` to fill in missing values.

This allows zipping potentially unbounded streams of data by key in
constant space but the caller is responsible for ensuring that the
streams are sorted by distinct keys.

**Signature**

```ts
export declare const zipAllSortedByKeyLeft: <K>(
  order: Order.Order<K>
) => <R2, E2, A2, A>(
  that: Stream<R2, E2, readonly [K, A2]>,
  defaultLeft: A
) => <R, E>(self: Stream<R, E, readonly [K, A]>) => Stream<R2 | R, E2 | E, readonly [K, A]>
```

Added in v1.0.0

## zipAllSortedByKeyRight

Zips this stream that is sorted by distinct keys and the specified stream
that is sorted by distinct keys to produce a new stream that is sorted by
distinct keys. Keeps only values from that stream, using the specified
value `default` to fill in missing values.

This allows zipping potentially unbounded streams of data by key in
constant space but the caller is responsible for ensuring that the
streams are sorted by distinct keys.

**Signature**

```ts
export declare const zipAllSortedByKeyRight: <K>(
  order: Order.Order<K>
) => <R2, E2, A2>(
  that: Stream<R2, E2, readonly [K, A2]>,
  defaultRight: A2
) => <R, E, A>(self: Stream<R, E, readonly [K, A]>) => Stream<R2 | R, E2 | E, readonly [K, A2]>
```

Added in v1.0.0

## zipAllSortedByKeyWith

Zips this stream that is sorted by distinct keys and the specified stream
that is sorted by distinct keys to produce a new stream that is sorted by
distinct keys. Uses the functions `left`, `right`, and `both` to handle
the cases where a key and value exist in this stream, that stream, or
both streams.

This allows zipping potentially unbounded streams of data by key in
constant space but the caller is responsible for ensuring that the
streams are sorted by distinct keys.

**Signature**

```ts
export declare const zipAllSortedByKeyWith: <K>(
  order: Order.Order<K>
) => <R2, E2, A, A3, A2>(
  that: Stream<R2, E2, readonly [K, A2]>,
  left: (a: A) => A3,
  right: (a2: A2) => A3,
  both: (a: A, a2: A2) => A3
) => <R, E>(self: Stream<R, E, readonly [K, A]>) => Stream<R2 | R, E2 | E, readonly [K, A3]>
```

Added in v1.0.0

## zipAllWith

Zips this stream with another point-wise. The provided functions will be
used to create elements for the composed stream.

The functions `left` and `right` will be used if the streams have different
lengths and one of the streams has ended before the other.

**Signature**

```ts
export declare const zipAllWith: <R2, E2, A2, A, A3>(
  that: Stream<R2, E2, A2>,
  left: (a: A) => A3,
  right: (a2: A2) => A3,
  both: (a: A, a2: A2) => A3
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A3>
```

Added in v1.0.0

## zipLatest

Zips the two streams so that when a value is emitted by either of the two
streams, it is combined with the latest value from the other stream to
produce a result.

Note: tracking the latest value is done on a per-chunk basis. That means
that emitted elements that are not the last value in chunks will never be
used for zipping.

**Signature**

```ts
export declare const zipLatest: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, readonly [A, A2]>
```

Added in v1.0.0

## zipLatestWith

Zips the two streams so that when a value is emitted by either of the two
streams, it is combined with the latest value from the other stream to
produce a result.

Note: tracking the latest value is done on a per-chunk basis. That means
that emitted elements that are not the last value in chunks will never be
used for zipping.

**Signature**

```ts
export declare const zipLatestWith: <R2, E2, A2, A, A3>(
  that: Stream<R2, E2, A2>,
  f: (a: A, a2: A2) => A3
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A3>
```

Added in v1.0.0

## zipLeft

Zips this stream with another point-wise, but keeps only the outputs of
this stream.

The new stream will end when one of the sides ends.

**Signature**

```ts
export declare const zipLeft: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A>
```

Added in v1.0.0

## zipRight

Zips this stream with another point-wise, but keeps only the outputs of the
other stream.

The new stream will end when one of the sides ends.

**Signature**

```ts
export declare const zipRight: <R2, E2, A2>(
  that: Stream<R2, E2, A2>
) => <R, E, A>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A2>
```

Added in v1.0.0

## zipWith

Zips this stream with another point-wise and applies the function to the
paired elements.

The new stream will end when one of the sides ends.

**Signature**

```ts
export declare const zipWith: <R2, E2, A2, A, A3>(
  that: Stream<R2, E2, A2>,
  f: (a: A, a2: A2) => A3
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A3>
```

Added in v1.0.0

## zipWithChunks

Zips this stream with another point-wise and applies the function to the
paired elements.

The new stream will end when one of the sides ends.

**Signature**

```ts
export declare const zipWithChunks: <R2, E2, A2, A, A3>(
  that: Stream<R2, E2, A2>,
  f: (
    left: Chunk.Chunk<A>,
    right: Chunk.Chunk<A2>
  ) => readonly [Chunk.Chunk<A3>, Either.Either<Chunk.Chunk<A>, Chunk.Chunk<A2>>]
) => <R, E>(self: Stream<R, E, A>) => Stream<R2 | R, E2 | E, A3>
```

Added in v1.0.0

## zipWithIndex

Zips this stream together with the index of elements.

**Signature**

```ts
export declare const zipWithIndex: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, readonly [A, number]>
```

Added in v1.0.0

## zipWithNext

Zips each element with the next element if present.

**Signature**

```ts
export declare const zipWithNext: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, readonly [A, Option.Option<A>]>
```

Added in v1.0.0

## zipWithPrevious

Zips each element with the previous element. Initially accompanied by
`None`.

**Signature**

```ts
export declare const zipWithPrevious: <R, E, A>(self: Stream<R, E, A>) => Stream<R, E, readonly [Option.Option<A>, A]>
```

Added in v1.0.0

## zipWithPreviousAndNext

Zips each element with both the previous and next element.

**Signature**

```ts
export declare const zipWithPreviousAndNext: <R, E, A>(
  self: Stream<R, E, A>
) => Stream<R, E, readonly [Option.Option<A>, A, Option.Option<A>]>
```

Added in v1.0.0
