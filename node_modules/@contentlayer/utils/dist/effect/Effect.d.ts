import { Effect as T, Either as E } from '@effect-ts/core';
import { ConsoleService } from './ConsoleService.js';
export * from '@effect-ts/core/Effect';
export type { _A as OutputOf } from '@effect-ts/core/Utils';
export declare const log: (...args: any[]) => T.Effect<import("@effect-ts/system/Has/index.js").Has<ConsoleService>, never, void>;
export declare const rightOrFail: <R, E1, EE1, A>(effect: T.Effect<R, E1, E.Either<EE1, A>>, __trace?: string) => T.Effect<R, E1 | EE1, A>;
export declare const eitherMap: <A1, A2>(mapRight: (a1: A1) => A2) => <R, E1, EE1>(effect: T.Effect<R, E1, E.Either<EE1, A1>>, __trace?: string) => T.Effect<R, E1, E.Either<EE1, A2>>;
export declare const chainMergeObject: <T2, E2, A1 extends {}, A2 extends {}>(effect: (a1: A1) => T.Effect<T2, E2, A2>) => <T1, E1>(self: T.Effect<T1, E1, A1>) => T.Effect<T1 & T2, E2 | E1, A1 & A2>;
export declare const forEachParDict: <A, R, E, B>(args: {
    mapKey: (a: A) => T.Effect<R, E, string>;
    mapValue: (a: A) => T.Effect<R, E, B>;
}) => (as: Iterable<A>) => T.Effect<R, E, Record<string, B>>;
export declare const forEachParDict_: <A, R, E, B>(as: Iterable<A>, { mapKey, mapValue, }: {
    mapKey: (a: A) => T.Effect<R, E, string>;
    mapValue: (a: A) => T.Effect<R, E, B>;
}) => T.Effect<R, E, Record<string, B>>;
//# sourceMappingURL=Effect.d.ts.map