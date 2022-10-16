import type { OT } from '../effect/index.js';
import { T } from '../effect/index.js';
import * as fs from './fs.js';
export declare const getContentlayerVersion: () => T.Effect<OT.HasTracer, GetContentlayerVersionError, string>;
export declare type GetContentlayerVersionError = fs.ReadFileError | fs.JsonParseError;
//# sourceMappingURL=version.d.ts.map