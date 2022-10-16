import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/index.ts";
import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { unknownToRelativePosixFilePath } from '@contentlayer/utils';
import { pipe, S, T, These } from '@contentlayer/utils/effect';
import { FSWatch } from '@contentlayer/utils/node';
import { FetchDataError } from '../errors/index.js';
import { provideDocumentTypeMapState } from './DocumentTypeMap.js';
import { fetchAllDocuments } from './fetchAllDocuments.js';
import { makeCacheItemFromFilePath } from './makeCacheItemFromFilePath.js';
export const fetchData = ({ coreSchemaDef, documentTypeDefs, flags, options, contentDirPath, contentDirInclude, contentDirExclude, verbose, }) => {
    const filePathPatternMap = makefilePathPatternMap(documentTypeDefs);
    const contentTypeMap = makeContentTypeMap(documentTypeDefs);
    const initEvent = { _tag: 'init' };
    const watchPaths = contentDirInclude.length > 0 ? contentDirInclude : ['.'];
    const fileUpdatesStream = (S.mapEitherRight(chokidarAllEventToCustomUpdateEvent)(FSWatch.makeAndSubscribe(watchPaths, {
        cwd: contentDirPath,
        ignoreInitial: true,
        ignored: contentDirExclude,
        // Unfortunately needed in order to avoid race conditions
        awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 10 },
    })));
    const resolveParams = (T.either(core.DataCache.loadPreviousCacheFromDisk({ schemaHash: coreSchemaDef.hash }), fileName_1 + ":54:116"));
    return (S.mapEitherLeft((error) => new core.SourceFetchDataError({ error, alreadyHandled: error._tag === 'HandledFetchDataError' }))(S.mapEitherRight((cache) => embedReferences({ cache, coreSchemaDef }))(S.chainSwitchMapEitherRight((cache) => (S.tapRightEither((cache_) => core.DataCache.writeCacheToDisk({ cache: cache_, schemaHash: coreSchemaDef.hash }))(
    // update local and persisted cache
    S.tapRight((cache_) => T.succeedWith(() => (cache = cache_), fileName_1 + ":106:45"))(S.mapEffectEitherRight((event) => (T.either(T.matchTag({
        init: () => fetchAllDocuments({
            coreSchemaDef,
            filePathPatternMap,
            contentDirPath,
            contentDirInclude,
            contentDirExclude,
            flags,
            options,
            previousCache: cache,
            verbose,
            contentTypeMap,
        }),
        deleted: (event) => T.succeedWith(() => {
            delete cache.cacheItemsMap[event.relativeFilePath];
            return cache;
        }, fileName_1 + ":86:30"),
        updated: (event) => updateCacheEntry({
            contentDirPath,
            filePathPatternMap,
            cache: cache,
            event,
            flags,
            coreSchemaDef,
            options,
            contentTypeMap,
        }),
    })(event), fileName_1 + ":102:21")))(S.startWithRight(initEvent)(S.tapRight((e) => T.succeedWith(() => (e._tag === 'updated' || e._tag === 'deleted') && console.log(`\nFile ${e._tag}: ${e.relativeFilePath}`), fileName_1 + ":62:24"))(fileUpdatesStream)))))))(S.fromEffect(resolveParams)))));
};
const makefilePathPatternMap = (documentTypeDefs) => Object.fromEntries(documentTypeDefs
    .filter((_) => _.filePathPattern)
    .map((documentDef) => [documentDef.filePathPattern, documentDef.name]));
export const testOnly_makefilePathPatternMap = makefilePathPatternMap;
const makeContentTypeMap = (documentTypeDefs) => Object.fromEntries(documentTypeDefs.filter((_) => _.filePathPattern).map((documentDef) => [documentDef.name, documentDef.contentType]));
export const testOnly_makeContentTypeMap = makeContentTypeMap;
const updateCacheEntry = ({ contentDirPath, filePathPatternMap, cache, event, flags, coreSchemaDef, options, contentTypeMap, }) => T.gen(function* ($) {
    yield* $((These.effectTapErrorOrWarning((errorOrWarning) => FetchDataError.handleErrors({
        errors: [errorOrWarning],
        documentCount: 1,
        flags,
        options,
        schemaDef: coreSchemaDef,
        verbose: false,
        contentDirPath,
    }))(These.effectTapSuccess((cacheItem) => T.succeedWith(() => {
        cache.cacheItemsMap[event.relativeFilePath] = cacheItem;
    }, fileName_1 + ":169:24"))(
    // NOTE in this code path the DocumentTypeMapState is not used
    provideDocumentTypeMapState(makeCacheItemFromFilePath({
        relativeFilePath: event.relativeFilePath,
        contentDirPath,
        filePathPatternMap,
        coreSchemaDef,
        options,
        previousCache: cache,
        contentTypeMap,
    }))))), fileName_1 + ":155:13");
    return cache;
}, fileName_1 + ":154:8");
const chokidarAllEventToCustomUpdateEvent = (event) => {
    switch (event._tag) {
        case 'FileAdded':
        case 'FileChanged':
            return { _tag: 'updated', relativeFilePath: unknownToRelativePosixFilePath(event.path) };
        case 'FileRemoved':
            return { _tag: 'deleted', relativeFilePath: unknownToRelativePosixFilePath(event.path) };
        case 'DirectoryRemoved':
        case 'DirectoryAdded':
            return { _tag: 'init' };
        default:
            utils.casesHandled(event);
    }
};
// TODO come up with better implementation for this that has correct and incremental caching behavior
// TODO make this work for deep nested references
const embedReferences = ({ cache, coreSchemaDef }) => {
    const documentDefs = Object.values(coreSchemaDef.documentTypeDefMap);
    const nestedDefs = Object.values(coreSchemaDef.nestedTypeDefMap);
    const defs = [...documentDefs, ...nestedDefs];
    const defsWithEmbeddedRefs = defs.filter((_) => _.fieldDefs.some((_) => core.isReferenceField(_) && _.embedDocument));
    const defsWithEmbeddedListRefs = defs.filter((_) => _.fieldDefs.some((_) => core.isListFieldDef(_) && _.of.type === 'reference' && _.of.embedDocument));
    const defNameSetWithEmbeddedRefs = new Set([
        ...defsWithEmbeddedRefs.map((_) => _.name),
        ...defsWithEmbeddedListRefs.map((_) => _.name),
    ]);
    if (defsWithEmbeddedRefs.length > 0) {
        for (const cacheItem of Object.values(cache.cacheItemsMap)) {
            // short circuit here
            if (!defNameSetWithEmbeddedRefs.has(cacheItem.documentTypeName))
                continue;
            const documentDef = coreSchemaDef.documentTypeDefMap[cacheItem.documentTypeName];
            const fieldDefsWithEmbeddedRefs = documentDef.fieldDefs.filter((_) => core.isReferenceField(_) && _.embedDocument);
            for (const fieldDef of fieldDefsWithEmbeddedRefs) {
                const referenceId = cacheItem.document[fieldDef.name];
                if (referenceId === undefined || referenceId === null)
                    continue;
                const referenceAlreadyEmbedded = typeof referenceId !== 'string';
                // TODO take care of case where embedded document was updated in the meantime
                if (referenceAlreadyEmbedded)
                    continue;
                const referencedDocument = cache.cacheItemsMap[referenceId].document;
                cacheItem.document[fieldDef.name] = referencedDocument;
            }
            // const embeddedListItemReferences = documentDef.fieldDefs.filter(core.isListFieldDef)
            const listFieldDefs = documentDef.fieldDefs.filter(core.isListFieldDef);
            // console.log({ listFieldDefs })
            for (const listFieldDef of listFieldDefs) {
                if (core.ListFieldDefItem.isDefItemReference(listFieldDef.of) && listFieldDef.of.embedDocument) {
                    const listValues = cacheItem.document[listFieldDef.name];
                    if (listValues === undefined || listValues === null || !Array.isArray(listValues))
                        continue;
                    for (const [index, listValue] of listValues.entries()) {
                        const referenceAlreadyEmbedded = typeof listValue !== 'string';
                        if (referenceAlreadyEmbedded)
                            continue;
                        const referencedDocument = cache.cacheItemsMap[listValue].document;
                        cacheItem.document[listFieldDef.name][index] = referencedDocument;
                    }
                }
            }
        }
    }
    return cache;
};
//# sourceMappingURL=index.js.map