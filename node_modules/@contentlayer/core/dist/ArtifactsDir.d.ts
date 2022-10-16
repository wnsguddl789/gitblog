import type { AbsolutePosixFilePath } from '@contentlayer/utils';
import type { OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { GetContentlayerVersionError } from '@contentlayer/utils/node';
import { fs } from '@contentlayer/utils/node';
import type { HasCwd } from './cwd.js';
export declare namespace ArtifactsDir {
    const getDirPath: ({ cwd }: {
        cwd: AbsolutePosixFilePath;
    }) => AbsolutePosixFilePath;
    const mkdir: T.Effect<OT.HasTracer & HasCwd, fs.MkdirError, AbsolutePosixFilePath>;
    const getCacheDirPath: T.Effect<OT.HasTracer & HasCwd, GetContentlayerVersionError, AbsolutePosixFilePath>;
    const mkdirCache: T.Effect<OT.HasTracer & HasCwd, fs.MkdirError | GetContentlayerVersionError, AbsolutePosixFilePath>;
}
//# sourceMappingURL=ArtifactsDir.d.ts.map