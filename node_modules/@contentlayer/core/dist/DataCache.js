import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/DataCache.ts";
import * as path from 'node:path';
import { OT, pipe, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { ArtifactsDir } from './ArtifactsDir.js';
export var DataCache;
(function (DataCache) {
    DataCache.loadPreviousCacheFromDisk = ({ schemaHash, }) => (OT.withSpan('@contentlayer/core/cache:loadPreviousCacheFromDisk', { attributes: { schemaHash } })(T.gen(function* ($) {
        const cacheDirPath = yield* $(ArtifactsDir.getCacheDirPath, fileName_1 + ":47:38");
        const filePath = path.join(cacheDirPath, dataCacheFileName(schemaHash));
        yield* $(OT.addAttribute('filePath', filePath), fileName_1 + ":50:17");
        const cache = yield* $(fs.readFileJsonIfExists(filePath), fileName_1 + ":51:31");
        return cache;
    }, fileName_1 + ":46:12")));
    DataCache.writeCacheToDisk = ({ cache, schemaHash, }) => (OT.withSpan('@contentlayer/core/cache:writeCacheToDisk', { attributes: { schemaHash } })(T.either(T.gen(function* ($) {
        const cacheDirPath = yield* $(ArtifactsDir.mkdirCache, fileName_1 + ":71:38");
        const filePath = path.join(cacheDirPath, dataCacheFileName(schemaHash));
        yield* $(OT.addAttribute('filePath', filePath), fileName_1 + ":74:17");
        yield* $(fs.writeFileJson({ filePath, content: cache }), fileName_1 + ":76:17");
    }, fileName_1 + ":70:12"), fileName_1 + ":78:15")));
    const dataCacheFileName = (schemaHash) => `data-${schemaHash}.json`;
})(DataCache || (DataCache = {}));
//# sourceMappingURL=DataCache.js.map