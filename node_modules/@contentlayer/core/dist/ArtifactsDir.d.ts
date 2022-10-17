import type { PosixFilePath } from '@contentlayer/utils';
import type { OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { GetContentlayerVersionError } from '@contentlayer/utils/node';
import { fs } from '@contentlayer/utils/node';
import type { HasCwd } from './cwd.js';
export declare namespace ArtifactsDir {
    const getDirPath: ({ cwd }: {
        cwd: PosixFilePath;
    }) => PosixFilePath;
    const mkdir: T.Effect<OT.HasTracer & HasCwd, fs.MkdirError, PosixFilePath>;
    const getCacheDirPath: T.Effect<OT.HasTracer & HasCwd, GetContentlayerVersionError, PosixFilePath>;
    const mkdirCache: T.Effect<OT.HasTracer & HasCwd, fs.MkdirError | GetContentlayerVersionError, PosixFilePath>;
}
//# sourceMappingURL=ArtifactsDir.d.ts.map