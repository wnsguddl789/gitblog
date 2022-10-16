import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/index.ts";
import * as utils from '@contentlayer/utils';
import { identity, pipe, T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
import { getFromDocumentContext } from '../DocumentContext.js';
import { makeDateField } from './field-date.js';
import { makeImageField } from './field-image.js';
import { makeMarkdownField } from './field-markdown.js';
import { makeMdxField } from './field-mdx.js';
import { parseFieldData } from './parseFieldData.js';
export const makeDocument = ({ rawContent, documentTypeDef, coreSchemaDef, relativeFilePath, contentDirPath, options, }) => (T.mapError_(T.gen(function* ($) {
    const { bodyFieldName, typeFieldName } = options.fieldOptions;
    // const includeBody = documentTypeDef.fieldDefs.some(
    //   (_) => _.name === bodyFieldName && _.isSystemField,
    // )
    const body = utils.pattern
        .match(rawContent)
        .when(rawContentHasBody, (_) => _.body)
        .otherwise(() => undefined);
    const rawData = { ...rawContent.fields, [bodyFieldName]: body };
    const docValues = yield* $(T.forEachParDict_(documentTypeDef.fieldDefs, {
        mapValue: (fieldDef) => getDataForFieldDef({
            fieldDef,
            rawFieldData: rawData[fieldDef.name],
            documentTypeName: documentTypeDef.name,
            coreSchemaDef,
            options,
            documentFilePath: relativeFilePath,
            contentDirPath,
        }),
        mapKey: (fieldDef) => T.succeed(fieldDef.name, fileName_1 + ":63:42"),
    }), fileName_1 + ":51:33");
    const _raw = yield* $(getFromDocumentContext('rawDocumentData'), fileName_1 + ":67:28");
    const doc = {
        ...docValues,
        _id: relativeFilePath,
        _raw,
        [typeFieldName]: documentTypeDef.name,
    };
    return doc;
}, fileName_1 + ":40:10"), (error) => error._tag === 'NoSuchNestedDocumentTypeError' ||
    error._tag === 'IncompatibleFieldDataError' ||
    error._tag === 'ImageError'
    ? error
    : new FetchDataError.UnexpectedError({ error, documentFilePath: relativeFilePath }), fileName_1 + ":78:15"));
const rawContentHasBody = (_) => 'body' in _ && _.body !== undefined;
export const getFlattenedPath = (relativeFilePath) => relativeFilePath
    // remove extension
    .split('.')
    .slice(0, -1)
    .join('.')
    // remove tailing `/index` or `index`
    .replace(/\/?index$/, '');
// TODO aggregate all "global" params into an effect service
const makeNestedDocument = ({ rawObjectData, fieldDefs, typeName, coreSchemaDef, options, documentFilePath, contentDirPath, }) => T.gen(function* ($) {
    const objValues = yield* $(T.forEachParDict_(fieldDefs, {
        mapValue: (fieldDef) => getDataForFieldDef({
            fieldDef,
            rawFieldData: rawObjectData[fieldDef.name],
            documentTypeName: typeName,
            coreSchemaDef,
            options,
            documentFilePath,
            contentDirPath,
        }),
        mapKey: (fieldDef) => T.succeed(fieldDef.name, fileName_1 + ":142:40"),
    }), fileName_1 + ":130:31");
    const typeNameField = options.fieldOptions.typeFieldName;
    const obj = { ...objValues, [typeNameField]: typeName, _raw: {} };
    return obj;
}, fileName_1 + ":129:8");
const getDataForFieldDef = ({ fieldDef, rawFieldData, documentTypeName, coreSchemaDef, options, documentFilePath, contentDirPath, }) => T.gen(function* ($) {
    if (rawFieldData === undefined && fieldDef.default) {
        rawFieldData = fieldDef.default;
    }
    if (rawFieldData === undefined) {
        console.assert(!fieldDef.isRequired || fieldDef.isSystemField, `Inconsistent data found: ${JSON.stringify({ fieldDef, documentFilePath, typeName: documentTypeName })}`);
        return undefined;
    }
    const documentTypeDef = coreSchemaDef.documentTypeDefMap[documentTypeName];
    const parseFieldDataEff = (fieldType) => parseFieldData({
        rawData: rawFieldData,
        fieldType,
        documentFilePath,
        fieldName: fieldDef.name,
        documentTypeDef,
    });
    switch (fieldDef.type) {
        case 'nested': {
            const nestedTypeDef = coreSchemaDef.nestedTypeDefMap[fieldDef.nestedTypeName];
            const rawObjectData = yield* $(parseFieldDataEff('nested'), fileName_1 + ":196:39");
            return yield* $(makeNestedDocument({
                rawObjectData,
                fieldDefs: nestedTypeDef.fieldDefs,
                typeName: nestedTypeDef.name,
                coreSchemaDef,
                options,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":197:24");
        }
        case 'nested_unnamed':
            const rawObjectData = yield* $(parseFieldDataEff('nested_unnamed'), fileName_1 + ":210:39");
            return yield* $(makeNestedDocument({
                rawObjectData,
                fieldDefs: fieldDef.typeDef.fieldDefs,
                typeName: '__UNNAMED__',
                coreSchemaDef,
                options,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":211:24");
        case 'nested_polymorphic': {
            const rawObjectData = yield* $(parseFieldDataEff('nested_polymorphic'), fileName_1 + ":223:39");
            const nestedTypeName = rawObjectData[fieldDef.typeField];
            if (!fieldDef.nestedTypeNames.includes(nestedTypeName)) {
                return yield* $(T.fail(new FetchDataError.NoSuchNestedDocumentTypeError({
                    nestedTypeName,
                    documentFilePath,
                    fieldName: fieldDef.name,
                    validNestedTypeNames: fieldDef.nestedTypeNames,
                    documentTypeDef: coreSchemaDef.documentTypeDefMap[documentTypeName],
                }), fileName_1 + ":228:19"), fileName_1 + ":227:26");
            }
            const nestedTypeDef = coreSchemaDef.nestedTypeDefMap[nestedTypeName];
            return yield* $(makeNestedDocument({
                rawObjectData,
                fieldDefs: nestedTypeDef.fieldDefs,
                typeName: nestedTypeDef.name,
                coreSchemaDef,
                options,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":242:24");
        }
        case 'reference':
        case 'reference_polymorphic':
            return yield* $(parseFieldDataEff(fieldDef.type), fileName_1 + ":256:24");
        case 'list_polymorphic':
        case 'list':
            const rawListData = yield* $(parseFieldDataEff('list'), fileName_1 + ":259:37");
            return yield* $(T.forEachPar_(rawListData, (rawItemData) => getDataForListItem({
                rawItemData,
                fieldDef,
                coreSchemaDef,
                options,
                documentTypeName,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":261:24"), fileName_1 + ":260:24");
        case 'date':
            const dateString = yield* $(parseFieldDataEff('date'), fileName_1 + ":274:36");
            return yield* $(makeDateField({ dateString, documentFilePath, fieldName: fieldDef.name, documentTypeDef, options }), fileName_1 + ":275:24");
        case 'markdown': {
            const mdString = yield* $(parseFieldDataEff('markdown'), fileName_1 + ":279:34");
            return yield* $(makeMarkdownField({ mdString, fieldDef, options }), fileName_1 + ":280:24");
        }
        case 'mdx': {
            const mdxString = yield* $(parseFieldDataEff('mdx'), fileName_1 + ":283:35");
            return yield* $(makeMdxField({ mdxString, contentDirPath, fieldDef, options }), fileName_1 + ":284:24");
        }
        case 'image':
            const imageData = yield* $(parseFieldDataEff('image'), fileName_1 + ":287:35");
            return yield* $(makeImageField({ imageData, documentFilePath, contentDirPath, fieldDef }), fileName_1 + ":288:24");
        case 'boolean':
        case 'string':
        case 'number':
        case 'json':
        case 'enum': // TODO validate enum value
            return yield* $(parseFieldDataEff(fieldDef.type), fileName_1 + ":294:24");
        default:
            utils.casesHandled(fieldDef);
    }
}, fileName_1 + ":169:8");
export const testOnly_getDataForFieldDef = getDataForFieldDef;
const getDataForListItem = ({ rawItemData, fieldDef, coreSchemaDef, options, documentTypeName, documentFilePath, contentDirPath, }) => T.gen(function* ($) {
    const documentTypeDef = coreSchemaDef.documentTypeDefMap[documentTypeName];
    const parseFieldDataEff = (fieldType) => parseFieldData({
        rawData: rawItemData,
        fieldType,
        documentFilePath,
        fieldName: fieldDef.name,
        documentTypeDef,
    });
    if (fieldDef.type === 'list_polymorphic') {
        const rawObjectData = yield* $(parseFieldDataEff('nested'), fileName_1 + ":331:37");
        const nestedTypeName = rawObjectData[fieldDef.typeField];
        const nestedTypeDef = coreSchemaDef.nestedTypeDefMap[nestedTypeName];
        if (nestedTypeDef === undefined) {
            const validNestedTypeNames = fieldDef.of
                .filter((_) => _.type === 'nested')
                .map((_) => _.nestedTypeName);
            return yield* $(T.fail(new FetchDataError.NoSuchNestedDocumentTypeError({
                nestedTypeName,
                documentFilePath,
                fieldName: fieldDef.name,
                validNestedTypeNames,
                documentTypeDef: coreSchemaDef.documentTypeDefMap[documentTypeName],
            }), fileName_1 + ":340:17"), fileName_1 + ":339:24");
        }
        return yield* $(makeNestedDocument({
            rawObjectData: rawItemData,
            fieldDefs: nestedTypeDef.fieldDefs,
            typeName: nestedTypeDef.name,
            coreSchemaDef,
            options,
            documentFilePath,
            contentDirPath,
        }), fileName_1 + ":351:22");
    }
    switch (fieldDef.of.type) {
        case 'nested': {
            const nestedTypeDef = coreSchemaDef.nestedTypeDefMap[fieldDef.of.nestedTypeName];
            const rawObjectData = yield* $(parseFieldDataEff('nested'), fileName_1 + ":367:39");
            return yield* $(makeNestedDocument({
                rawObjectData,
                fieldDefs: nestedTypeDef.fieldDefs,
                typeName: nestedTypeDef.name,
                coreSchemaDef,
                options,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":368:24");
        }
        case 'nested_unnamed': {
            const rawObjectData = yield* $(parseFieldDataEff('nested_unnamed'), fileName_1 + ":381:39");
            return yield* $(makeNestedDocument({
                rawObjectData,
                fieldDefs: fieldDef.of.typeDef.fieldDefs,
                typeName: '__UNNAMED__',
                coreSchemaDef,
                options,
                documentFilePath,
                contentDirPath,
            }), fileName_1 + ":382:24");
        }
        case 'mdx':
            return makeMdxField({ mdxString: rawItemData, contentDirPath, fieldDef, options });
        case 'date':
            const dateString = yield* $(parseFieldDataEff('date'), fileName_1 + ":397:36");
            return yield* $(makeDateField({ dateString, documentFilePath, fieldName: fieldDef.name, documentTypeDef, options }), fileName_1 + ":398:24");
        case 'markdown': {
            const mdString = yield* $(parseFieldDataEff('markdown'), fileName_1 + ":402:34");
            return yield* $(makeMarkdownField({ mdString, fieldDef, options }), fileName_1 + ":403:24");
        }
        case 'mdx': {
            const mdxString = yield* $(parseFieldDataEff('mdx'), fileName_1 + ":406:35");
            return yield* $(makeMdxField({ mdxString, contentDirPath, fieldDef, options }), fileName_1 + ":407:24");
        }
        case 'image':
            const imageData = yield* $(parseFieldDataEff('image'), fileName_1 + ":410:35");
            return yield* $(makeImageField({ imageData, documentFilePath, contentDirPath, fieldDef }), fileName_1 + ":411:24");
        case 'enum':
        case 'reference':
        case 'string':
        case 'boolean':
        case 'number':
        case 'json':
            return rawItemData;
        default:
            return utils.casesHandled(fieldDef.of);
    }
}, fileName_1 + ":319:8");
//# sourceMappingURL=index.js.map