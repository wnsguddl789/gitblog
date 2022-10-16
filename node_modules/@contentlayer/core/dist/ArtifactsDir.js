import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/ArtifactsDir.ts";
import { filePathJoin } from '@contentlayer/utils';
import { pipe, T } from '@contentlayer/utils/effect';
import { fs, getContentlayerVersion } from '@contentlayer/utils/node';
import { getCwd } from './cwd.js';
// import utilsPkg from '@contentlayer/utils/package.json'
export var ArtifactsDir;
(function (ArtifactsDir) {
    ArtifactsDir.getDirPath = ({ cwd }) => filePathJoin(cwd, '.contentlayer');
    ArtifactsDir.mkdir = T.gen(function* ($) {
        const cwd = yield* $(getCwd, fileName_1 + ":17:25");
        const dirPath = ArtifactsDir.getDirPath({ cwd });
        yield* $(fs.mkdirp(dirPath), fileName_1 + ":20:13");
        return dirPath;
    }, fileName_1 + ":16:100");
    ArtifactsDir.getCacheDirPath = (T.map_(T.struct({
        contentlayerVersion: getContentlayerVersion(),
        cwd: getCwd,
    }, fileName_1 + ":27:15"), ({ contentlayerVersion, cwd }) => filePathJoin(ArtifactsDir.getDirPath({ cwd }), '.cache', `v${contentlayerVersion}`), fileName_1 + ":31:12"));
    ArtifactsDir.mkdirCache = (T.tap_(ArtifactsDir.getCacheDirPath, fs.mkdirp, fileName_1 + ":44:34"));
})(ArtifactsDir || (ArtifactsDir = {}));
//# sourceMappingURL=ArtifactsDir.js.map