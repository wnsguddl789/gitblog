import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/fetchAllDocuments.ts";
import * as os from 'node:os';
import { asMutableArray, relativePosixFilePath } from '@contentlayer/utils';
import { Chunk, O, OT, pipe, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import glob from 'fast-glob';
import { FetchDataError } from '../errors/index.js';
import { DocumentTypeMapState, provideDocumentTypeMapState } from './DocumentTypeMap.js';
import { makeCacheItemFromFilePath } from './makeCacheItemFromFilePath.js';
export const fetchAllDocuments = ({ coreSchemaDef, filePathPatternMap, contentDirPath, contentDirInclude, contentDirExclude, contentTypeMap, flags, options, previousCache, verbose, }) => (OT.withSpan('@contentlayer/source-local/fetchData:fetchAllDocuments', { attributes: { contentDirPath } })(provideDocumentTypeMapState(T.gen(function* ($) {
    const allRelativeFilePaths = yield* $(getAllRelativeFilePaths({ contentDirPath, contentDirInclude, contentDirExclude }), fileName_1 + ":47:44");
    const concurrencyLimit = os.cpus().length;
    const { dataErrors, documents } = yield* $((T.map_(T.map_(T.forEachParN_(allRelativeFilePaths, concurrencyLimit, (relativeFilePath) => makeCacheItemFromFilePath({
        relativeFilePath,
        filePathPatternMap,
        coreSchemaDef,
        contentDirPath,
        options,
        previousCache,
        contentTypeMap,
    }), fileName_1 + ":56:24"), Chunk.partitionThese, fileName_1 + ":67:16"), ({ tuple: [errors, docs] }) => ({ dataErrors: Chunk.toArray(errors), documents: Chunk.toArray(docs) }), fileName_1 + ":68:16")), fileName_1 + ":53:49");
    const singletonDataErrors = yield* $(validateSingletonDocuments({ coreSchemaDef, filePathPatternMap }), fileName_1 + ":72:43");
    yield* $(FetchDataError.handleErrors({
        errors: [...dataErrors, ...singletonDataErrors],
        documentCount: allRelativeFilePaths.length,
        flags,
        options,
        schemaDef: coreSchemaDef,
        contentDirPath,
        verbose,
    }), fileName_1 + ":74:15");
    const cacheItemsMap = Object.fromEntries(documents.map((_) => [_.document._id, _]));
    return { cacheItemsMap };
}, fileName_1 + ":46:10"))));
const getAllRelativeFilePaths = ({ contentDirPath, contentDirInclude, contentDirExclude, }) => {
    const getPatternPrefix = (paths_) => {
        const paths = paths_
            .map((_) => _.trim())
            .filter((_) => _ !== '.' && _ !== './')
            .map((_) => (_.endsWith('/') ? _ : `${_}/`));
        if (paths.length === 0)
            return '';
        if (paths.length === 1)
            return paths[0];
        return `{${paths.join(',')}}`;
    };
    const filePathPattern = '**/*.{md,mdx,json,yaml,yml}';
    const pattern = `${getPatternPrefix(contentDirInclude)}${filePathPattern}`;
    return (OT.withSpan('@contentlayer/source-local/fetchData:getAllRelativeFilePaths')(T.map_(T.tryCatchPromise(() => glob(pattern, { cwd: contentDirPath, ignore: asMutableArray(contentDirExclude) }), (error) => new fs.UnknownFSError({ error }), fileName_1 + ":118:22"), (_) => _.map(relativePosixFilePath), fileName_1 + ":122:10")));
};
const validateSingletonDocuments = ({ coreSchemaDef, filePathPatternMap, }) => T.gen(function* ($) {
    const singletonDocumentDefs = Object.values(coreSchemaDef.documentTypeDefMap).filter((documentTypeDef) => documentTypeDef.isSingleton);
    const documentTypeMap = yield* $(DocumentTypeMapState.get, fileName_1 + ":139:37");
    const invertedFilePathPattnernMap = invertRecord(filePathPatternMap);
    return singletonDocumentDefs
        .filter((documentTypeDef) => (O.getOrElse_(O.map_(documentTypeMap.getFilePaths(documentTypeDef.name), (_) => _.length), () => 0)) !== 1)
        .map((documentTypeDef) => new FetchDataError.SingletonDocumentNotFoundError({
        documentTypeDef,
        filePath: invertedFilePathPattnernMap[documentTypeDef.name],
    }));
}, fileName_1 + ":134:8");
const invertRecord = (record) => (Object.fromEntries(((entries) => entries.map(([key, value]) => [value, key]))(Object.entries(record))));
//# sourceMappingURL=fetchAllDocuments.js.map