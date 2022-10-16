import type { E } from '@contentlayer/utils/effect';
import { OT, S, T } from '@contentlayer/utils/effect';
import type { GetContentlayerVersionError } from '@contentlayer/utils/node';
import { fs } from '@contentlayer/utils/node';
import type { HasCwd } from '../cwd.js';
import type { EsbuildBinNotFoundError } from '../errors.js';
import { ConfigNoDefaultExportError, ConfigReadError, NoConfigFoundError } from '../errors.js';
import type { SourcePlugin } from '../plugin.js';
import * as esbuild from './esbuild.js';
declare type GetConfigError = esbuild.EsbuildError | NoConfigFoundError | fs.StatError | fs.UnknownFSError | fs.MkdirError | EsbuildBinNotFoundError | ConfigReadError | ConfigNoDefaultExportError | GetContentlayerVersionError;
export declare type Config = {
    source: SourcePlugin;
    esbuildHash: string;
};
export declare const getConfig: ({ configPath, }: {
    configPath?: string | undefined;
}) => T.Effect<OT.HasTracer & HasCwd, GetConfigError, Config>;
export declare const getConfigWatch: ({ configPath, }: {
    configPath?: string;
}) => S.Stream<OT.HasTracer & HasCwd, never, E.Either<GetConfigError, Config>>;
export {};
//# sourceMappingURL=index.d.ts.map