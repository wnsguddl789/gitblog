import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/hash.ts";
import { xxhash64 } from 'hash-wasm';
import { T, Tagged } from './effect/index.js';
export const hashObject = (obj) => {
    return T.tryCatchPromise(() => xxhash64(stringifyIfNeeded(obj)), (error) => new HashError({ error }), fileName_1 + ":7:27");
};
export class HashError extends Tagged('HashError') {
}
const stringifyIfNeeded = (_) => (typeof _ === 'string' ? _ : JSON.stringify(_));
//# sourceMappingURL=hash.js.map