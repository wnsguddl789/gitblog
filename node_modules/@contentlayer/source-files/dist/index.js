import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/index.ts";
import * as core from '@contentlayer/core';
import { processArgs, SourceProvideSchemaError } from '@contentlayer/core';
import { unknownToAbsolutePosixFilePath, unknownToRelativePosixFilePath } from '@contentlayer/utils';
import { pipe, S, T } from '@contentlayer/utils/effect';
import { fetchData } from './fetchData/index.js';
import { makeCoreSchema } from './schema/provideSchema.js';
export * from './types.js';
export * from './schema/defs/index.js';
export const makeSource = async (args) => {
    const { options, extensions, restArgs: { documentTypes, contentDirPath: contentDirPath_, contentDirInclude: contentDirInclude_, contentDirExclude: contentDirExclude_, onUnknownDocuments = 'skip-warn', onMissingOrIncompatibleData = 'skip-warn', onExtraFieldData = 'warn', }, } = await processArgs(args);
    const flags = { onUnknownDocuments, onExtraFieldData, onMissingOrIncompatibleData };
    const documentTypeDefs = (Array.isArray(documentTypes) ? documentTypes : Object.values(documentTypes)).map((_) => _.def());
    return {
        type: 'local',
        extensions: extensions ?? {},
        options,
        provideSchema: (esbuildHash) => (T.mapError_(makeCoreSchema({ documentTypeDefs, options, esbuildHash }), (error) => new SourceProvideSchemaError({ error }), fileName_1 + ":104:19")),
        fetchData: ({ schemaDef, verbose }) => (S.chain_(S.fromEffect(core.getCwd), (cwd) => {
            const contentDirPath = unknownToAbsolutePosixFilePath(contentDirPath_, cwd);
            const contentDirExclude = (contentDirExclude_ ?? contentDirExcludeDefault).map((_) => unknownToRelativePosixFilePath(_, contentDirPath));
            const contentDirInclude = (contentDirInclude_ ?? []).map((_) => unknownToRelativePosixFilePath(_, contentDirPath));
            return fetchData({
                coreSchemaDef: schemaDef,
                documentTypeDefs,
                flags,
                options,
                contentDirPath,
                contentDirExclude,
                contentDirInclude,
                verbose,
            });
        })),
    };
};
export const contentDirExcludeDefault = ['node_modules', '.git', '.yarn', '.cache', '.next', '.contentlayer'];
//# sourceMappingURL=index.js.map