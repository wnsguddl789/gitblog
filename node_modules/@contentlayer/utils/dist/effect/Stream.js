import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/effect/Stream.ts";
import { pipe } from '@effect-ts/core';
import * as Chunk from '@effect-ts/core/Collections/Immutable/Chunk';
import * as Tuple from '@effect-ts/core/Collections/Immutable/Tuple';
import * as T from '@effect-ts/core/Effect';
import * as S from '@effect-ts/core/Effect/Experimental/Stream';
import * as E from '@effect-ts/core/Either';
export * from '@effect-ts/core/Effect/Experimental/Stream';
export const streamTapSkipFirst = (f) => (stream) => (S.mapAccumEffect_(stream, 0, (x, o) => T.gen(function* (_) {
    if (x > 0) {
        yield* _(f(o), fileName_1 + ":18:21");
    }
    return Tuple.tuple(x + 1, o);
}, fileName_1 + ":16:14")));
/** Note this function doesn't currently work if the first value is a `E.left` value */
export const tapSkipFirstRight = (f) => (stream) => (S.map_(S.tap_(S.zipWithIndex(stream), ({ tuple: [val, index] }) => (index === 0 || E.isLeft(val) ? T.succeed(null, fileName_1 + ":32:83") : f(val.right))), ({ tuple: [val] }) => val));
export const tapRight = (f) => (stream) => (S.tap_(stream, (val) => (E.isLeft(val) ? T.succeed(null, fileName_1 + ":41:48") : f(val.right))));
export const tapLeft = (f) => (stream) => (S.tap_(stream, (val) => (E.isLeft(val) ? f(val.left) : T.succeed(null, fileName_1 + ":49:62"))));
export const tapRightEither = (f) => (stream) => (S.tap_(stream, (val) => (E.isLeft(val) ? T.succeed(null, fileName_1 + ":57:48") : f(val.right))));
export const startWith = (...values) => (stream) => S.merge_(stream, S.fromChunk(Chunk.from(values)));
export const startWithRight = (value) => (stream) => S.merge_(stream, S.fromIterable([E.right(value)]));
export const chainMapEitherRight = (mapRight) => (stream) => {
    return S.chain_(stream, E.fold((_left) => stream, (right) => mapRight(right)));
};
export const chainSwitchMapEitherRight = (mapRight) => (stream) => {
    return S.chainParSwitch_(stream, E.fold((_left) => stream, (right) => mapRight(right)), 1);
};
export const mapEffectEitherRight = (mapRight) => (stream) => {
    return S.mapEffect_(stream, E.fold((left) => T.succeed(E.leftW(left), fileName_1 + ":100:28"), (right) => mapRight(right)));
};
export const mapEitherLeft = (mapLeft) => (stream) => {
    return S.map_(stream, E.mapLeft(mapLeft));
};
export const mapEitherRight = (mapRight) => (stream) => {
    return S.map_(stream, E.map(mapRight));
};
//# sourceMappingURL=Stream.js.map