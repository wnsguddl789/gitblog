// ets_tracing: off
import { Chunk, Effect as T, Either as E, pipe } from '@effect-ts/core';
import * as Tuple from '@effect-ts/core/Collections/Immutable/Tuple';
import { ConsoleService } from './ConsoleService.js';
export * from '@effect-ts/core/Effect';
// export const log = (...args: any[]) =>
//   T.succeedWith(() => {
//     console.log(...args)
//   })
// NOTE this is temporary until Stackblitz supports deconstructed exports
// export const { log } = T.deriveLifted(ConsoleService)(['log'], [], [])
const log_ = T.deriveLifted(ConsoleService)(['log'], [], []);
export const log = log_.log;
export const rightOrFail = (effect, __trace) => T.chain_(effect, E.fold((x) => T.fail(x, __trace), (x) => T.succeed(x, __trace)));
export const eitherMap = (mapRight) => (effect, __trace) => T.map_(effect, E.map(mapRight));
export const chainMergeObject = (effect) => (self) => T.chain_(self, (a1) => (T.map_(effect(a1), (a2) => ({ ...a1, ...a2 }))));
export const forEachParDict = (args) => (as) => forEachParDict_(as, args);
export const forEachParDict_ = (as, { mapKey, mapValue, }) => (T.map_(T.map_(T.map_(T.forEach_(as, (a) => T.tuplePar(mapKey(a), mapValue(a))), Chunk.map(Tuple.toNative)), Chunk.toArray), Object.fromEntries));
//# sourceMappingURL=Effect.js.map