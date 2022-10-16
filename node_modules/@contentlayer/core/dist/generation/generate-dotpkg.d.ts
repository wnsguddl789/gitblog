import type { E, HasClock, HasConsole } from '@contentlayer/utils/effect';
import { OT, S, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import type { HasCwd } from '../cwd.js';
import type { SourceProvideSchemaError } from '../errors.js';
import type { Config } from '../getConfig/index.js';
import type { SourceFetchDataError } from '../index.js';
import type { PluginOptions, SourcePluginType } from '../plugin.js';
import type { SchemaDef } from '../schema/index.js';
export declare type GenerationOptions = {
    sourcePluginType: SourcePluginType;
    options: PluginOptions;
};
declare type GenerateDotpkgError = fs.WriteFileError | fs.JsonStringifyError | fs.MkdirError | fs.RmError | SourceProvideSchemaError | SourceFetchDataError;
export declare type GenerateInfo = {
    documentCount: number;
};
export declare const logGenerateInfo: (info: GenerateInfo) => T.Effect<HasConsole, never, void>;
export declare const generateDotpkg: ({ config, verbose, }: {
    config: Config;
    verbose: boolean;
}) => T.Effect<OT.HasTracer & HasClock & HasCwd & HasConsole, GenerateDotpkgError, GenerateInfo>;
export declare const generateDotpkgStream: ({ config, verbose, isDev, }: {
    config: Config;
    verbose: boolean;
    isDev: boolean;
}) => S.Stream<OT.HasTracer & HasClock & HasCwd & HasConsole, never, E.Either<GenerateDotpkgError, GenerateInfo>>;
export declare const makeDataTypes: ({ schemaDef }: {
    schemaDef: SchemaDef;
}) => string;
export {};
//# sourceMappingURL=generate-dotpkg.d.ts.map