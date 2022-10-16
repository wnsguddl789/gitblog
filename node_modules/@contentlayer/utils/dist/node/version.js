import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/node/version.ts";
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipe, T } from '../effect/index.js';
import * as fs from './fs.js';
// TODO do this at compile time as this takes 10ms every time
// use static import once JSON modules are no longer experimental
// import utilsPkg from '@contentlayer/utils/package.json'
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const getContentlayerVersion = () => {
    // Go two levels up for "dist/node/version.js"
    const packageJsonFilePath = path.join(__dirname, '..', '..', 'package.json');
    return (T.catchTag_(T.map_(fs.readFileJson(packageJsonFilePath), (pkg) => pkg.version, fileName_1 + ":20:10"), 'node.fs.FileNotFoundError', (e) => T.die(e, fileName_1 + ":21:57"), fileName_1 + ":21:15"));
};
//# sourceMappingURL=version.js.map