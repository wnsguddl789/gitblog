import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/makeCacheItemFromFilePath.ts";
import { filePathJoin } from '@contentlayer/utils';
import { identity, O, OT, pipe, T, These } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import matter from 'gray-matter';
import yaml from 'yaml';
import { FetchDataError } from '../errors/index.js';
import { makeAndProvideDocumentContext } from './DocumentContext.js';
import { DocumentTypeMapState } from './DocumentTypeMap.js';
import { makeDocument } from './mapping/index.js';
import { validateDocumentData } from './validateDocumentData.js';
export const makeCacheItemFromFilePath = ({ relativeFilePath, filePathPatternMap, coreSchemaDef, contentDirPath, options, previousCache, contentTypeMap, }) => (These.effectThese(T.mapError_(OT.withSpan('@contentlayer/source-local/fetchData:makeCacheItemFromFilePath', { attributes: { relativeFilePath } })(T.gen(function* ($) {
    const fullFilePath = filePathJoin(contentDirPath, relativeFilePath);
    const documentHash = yield* $((T.map_(fs.stat(fullFilePath), (_) => _.mtime.getTime().toString(), fileName_1 + ":47:16")), fileName_1 + ":44:36");
    // return previous cache item if it exists
    if (previousCache &&
        previousCache.cacheItemsMap[relativeFilePath] &&
        previousCache.cacheItemsMap[relativeFilePath].documentHash === documentHash &&
        previousCache.cacheItemsMap[relativeFilePath].hasWarnings === false) {
        const cacheItem = previousCache.cacheItemsMap[relativeFilePath];
        yield* $(DocumentTypeMapState.update((_) => _.add(cacheItem.documentTypeName, relativeFilePath)), fileName_1 + ":59:17");
        return These.succeed(cacheItem);
    }
    const rawContent = yield* $(processRawContent({ fullFilePath, relativeFilePath }), fileName_1 + ":64:34");
    const [{ documentTypeDef }, warnings] = yield* $((T.map_(T.chain_(validateDocumentData({
        rawContent,
        relativeFilePath,
        coreSchemaDef,
        filePathPatternMap,
        options,
        contentDirPath,
        contentTypeMap,
    }), These.toEffect, fileName_1 + ":77:18"), (_) => _.tuple, fileName_1 + ":78:16")), fileName_1 + ":66:55");
    const document = yield* $((makeAndProvideDocumentContext({ rawContent, relativeFilePath, documentTypeDef })(makeDocument({
        documentTypeDef,
        rawContent,
        coreSchemaDef,
        relativeFilePath,
        contentDirPath,
        options,
    }))), fileName_1 + ":82:32");
    const computedValues = yield* $(getComputedValues({ documentTypeDef, document, documentFilePath: relativeFilePath }), fileName_1 + ":96:38");
    if (computedValues) {
        Object.entries(computedValues).forEach(([fieldName, value]) => {
            document[fieldName] = value;
        });
    }
    return These.warnOption({ document, documentHash, hasWarnings: O.isSome(warnings), documentTypeName: documentTypeDef.name }, warnings);
}, fileName_1 + ":41:10")), (error) => {
    switch (error._tag) {
        case 'node.fs.StatError':
        case 'node.fs.ReadFileError':
        case 'node.fs.FileNotFoundError':
            return new FetchDataError.UnexpectedError({ error, documentFilePath: relativeFilePath });
        default:
            return error;
    }
}, fileName_1 + ":111:15")));
const processRawContent = ({ fullFilePath, relativeFilePath, }) => (OT.withSpan('@contentlayer/source-local/fetchData:getRawContent')(T.gen(function* ($) {
    const fileContent = yield* $(fs.readFile(fullFilePath), fileName_1 + ":143:35");
    const filePathExtension = relativeFilePath.toLowerCase().split('.').pop();
    switch (filePathExtension) {
        case 'md': {
            const markdown = yield* $(parseMarkdown({ markdownString: fileContent, documentFilePath: relativeFilePath }), fileName_1 + ":148:36");
            return {
                kind: 'markdown',
                fields: markdown.data,
                body: markdown.content,
                rawDocumentContent: fileContent,
            };
        }
        case 'mdx': {
            const markdown = yield* $(parseMarkdown({ markdownString: fileContent, documentFilePath: relativeFilePath }), fileName_1 + ":157:36");
            return {
                kind: 'mdx',
                fields: markdown.data,
                body: markdown.content,
                rawDocumentContent: fileContent,
            };
        }
        case 'json': {
            const fields = yield* $(parseJson({ jsonString: fileContent, documentFilePath: relativeFilePath }), fileName_1 + ":166:34");
            return { kind: 'json', fields };
        }
        case 'yaml':
        case 'yml': {
            const fields = yield* $(parseYaml({ yamlString: fileContent, documentFilePath: relativeFilePath }), fileName_1 + ":171:34");
            return { kind: 'yaml', fields };
        }
        default:
            return yield* $(T.fail(new FetchDataError.UnsupportedFileExtension({ extension: filePathExtension, filePath: relativeFilePath }), fileName_1 + ":176:19"), fileName_1 + ":175:26");
    }
}, fileName_1 + ":142:10")));
const getComputedValues = ({ document, documentTypeDef, documentFilePath, }) => {
    if (documentTypeDef.computedFields === undefined) {
        return T.succeed(undefined, fileName_1 + ":195:21");
    }
    return (T.forEachParDict({
        mapKey: (field) => T.succeed(field.name, fileName_1 + ":201:35"),
        mapValue: (field) => T.tryCatchPromise(async () => field.resolve(document), (error) => new FetchDataError.ComputedValueError({ error, documentFilePath, documentTypeDef }), fileName_1 + ":203:26"),
    })(documentTypeDef.computedFields));
};
const parseMarkdown = ({ markdownString, documentFilePath, }) => T.tryCatch(() => matter(markdownString, {
    engines: {
        // Provide custom YAML engine to avoid parsing of date values https://github.com/jonschlinkert/gray-matter/issues/62)
        yaml: (str) => yaml.parse(str),
    },
}), (error) => {
    if (error.name === 'YAMLException') {
        return new FetchDataError.InvalidFrontmatterError({ error, documentFilePath });
    }
    else {
        return new FetchDataError.InvalidMarkdownFileError({ error, documentFilePath });
    }
}, fileName_1 + ":222:13");
const parseJson = ({ jsonString, documentFilePath, }) => T.tryCatch(() => JSON.parse(jsonString), (error) => new FetchDataError.InvalidJsonFileError({ error, documentFilePath }), fileName_1 + ":246:13");
const parseYaml = ({ yamlString, documentFilePath, }) => T.tryCatch(() => yaml.parse(yamlString), (error) => new FetchDataError.InvalidYamlFileError({ error, documentFilePath }), fileName_1 + ":258:13");
//# sourceMappingURL=makeCacheItemFromFilePath.js.map