import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/effect/Array.ts";
import { Array, pipe } from '@effect-ts/core';
import * as O from './Option.js';
export * from '@effect-ts/core/Collections/Immutable/Array';
export const headUnsafe = (array) => (O.getUnsafe(Array.head(array)));
//# sourceMappingURL=Array.js.map