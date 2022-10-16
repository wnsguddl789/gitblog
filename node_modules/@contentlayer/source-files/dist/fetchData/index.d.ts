import type { HasCwd } from '@contentlayer/core';
import * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import type { E, HasConsole, OT } from '@contentlayer/utils/effect';
import { S } from '@contentlayer/utils/effect';
import type * as LocalSchema from '../schema/defs/index.js';
import type { ContentTypeMap, FilePathPatternMap, Flags } from '../types.js';
export declare const fetchData: ({ coreSchemaDef, documentTypeDefs, flags, options, contentDirPath, contentDirInclude, contentDirExclude, verbose, }: {
    coreSchemaDef: core.SchemaDef;
    documentTypeDefs: LocalSchema.DocumentTypeDef[];
    flags: Flags;
    options: core.PluginOptions;
    contentDirPath: AbsolutePosixFilePath;
    contentDirInclude: readonly RelativePosixFilePath[];
    contentDirExclude: readonly RelativePosixFilePath[];
    verbose: boolean;
}) => S.Stream<OT.HasTracer & HasCwd & HasConsole, never, E.Either<core.SourceFetchDataError, core.DataCache.Cache>>;
export declare const testOnly_makefilePathPatternMap: (documentTypeDefs: LocalSchema.DocumentTypeDef[]) => FilePathPatternMap;
export declare const testOnly_makeContentTypeMap: (documentTypeDefs: LocalSchema.DocumentTypeDef[]) => ContentTypeMap;
//# sourceMappingURL=index.d.ts.map