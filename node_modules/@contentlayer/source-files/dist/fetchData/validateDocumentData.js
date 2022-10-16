import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/validateDocumentData.ts";
import { filePathJoin } from '@contentlayer/utils';
import { O, OT, pipe, T, These } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import micromatch from 'micromatch';
import { FetchDataError } from '../errors/index.js';
import { DocumentTypeMapState } from './DocumentTypeMap.js';
export const validateDocumentData = ({ coreSchemaDef, rawContent, relativeFilePath, filePathPatternMap, options, contentDirPath, contentTypeMap, }) => (OT.withSpan('validateDocumentData', { attributes: { relativeFilePath } })(T.gen(function* ($) {
    const documentDefName = getDocumentDefName({ rawContent, filePathPatternMap, relativeFilePath, options });
    yield* $(OT.addAttribute('documentDefName', documentDefName), fileName_1 + ":50:15");
    if (documentDefName === undefined) {
        const typeFieldName = options.fieldOptions.typeFieldName;
        return These.fail(new FetchDataError.CouldNotDetermineDocumentTypeError({ documentFilePath: relativeFilePath, typeFieldName }));
    }
    const documentTypeDef = coreSchemaDef.documentTypeDefMap[documentDefName];
    if (documentTypeDef === undefined) {
        return These.fail(new FetchDataError.NoSuchDocumentTypeError({
            documentTypeName: documentDefName,
            documentFilePath: relativeFilePath,
        }));
    }
    const contentType = contentTypeMap[documentTypeDef.name];
    const mismatchError = validateContentTypeMatchesFileExtension({ contentType, relativeFilePath });
    if (mismatchError)
        return These.fail(mismatchError);
    yield* $(DocumentTypeMapState.update((_) => _.add(documentDefName, relativeFilePath)), fileName_1 + ":74:15");
    const existingDataFieldKeys = Object.keys(rawContent.fields);
    // make sure all required fields are present
    const requiredFieldsWithoutDefaultValue = documentTypeDef.fieldDefs.filter((_) => _.isRequired && _.default === undefined && _.isSystemField === false);
    const misingRequiredFieldDefs = requiredFieldsWithoutDefaultValue.filter((fieldDef) => !existingDataFieldKeys.includes(fieldDef.name));
    if (misingRequiredFieldDefs.length > 0) {
        return These.fail(new FetchDataError.MissingRequiredFieldsError({
            documentFilePath: relativeFilePath,
            documentTypeDef,
            fieldDefsWithMissingData: misingRequiredFieldDefs,
        }));
    }
    let warningOption = O.none;
    // warn about data fields not defined in the schema
    const typeFieldName = options.fieldOptions.typeFieldName;
    // NOTE we also need to add the system-level type name field to the list of existing data fields
    const schemaFieldNames = documentTypeDef.fieldDefs.map((_) => _.name).concat([typeFieldName]);
    const extraFieldEntries = existingDataFieldKeys
        .filter((fieldKey) => !schemaFieldNames.includes(fieldKey))
        .map((fieldKey) => [fieldKey, rawContent.fields[fieldKey]]);
    if (extraFieldEntries.length > 0) {
        const extraFieldDataError = new FetchDataError.ExtraFieldDataError({
            documentFilePath: relativeFilePath,
            extraFieldEntries,
            documentTypeDef,
        });
        warningOption = O.some(extraFieldDataError);
    }
    for (const fieldDef of documentTypeDef.fieldDefs) {
        const fieldValidOption = yield* $(validateFieldData({
            documentFilePath: relativeFilePath,
            documentTypeDef,
            fieldDef,
            rawFieldData: rawContent.fields[fieldDef.name],
            contentDirPath,
        }), fileName_1 + ":116:42");
        if (O.isSome(fieldValidOption)) {
            return These.fail(fieldValidOption.value);
        }
    }
    // TODO validate nesteds
    return These.warnOption({ documentTypeDef }, warningOption);
}, fileName_1 + ":47:10")));
const getDocumentDefName = ({ rawContent, relativeFilePath, filePathPatternMap, options, }) => {
    // first check if provided document has a type field value
    const typeFieldName = options.fieldOptions.typeFieldName;
    const typeFieldValue = rawContent.fields[typeFieldName];
    if (typeFieldValue !== undefined) {
        return typeFieldValue;
    }
    // otherwise try to see whether one of the document type definitions has a file path pattern
    // that matches the file path
    return getDocumentDefNameByFilePathPattern({ filePathPatternMap, relativeFilePath });
};
const getDocumentDefNameByFilePathPattern = ({ relativeFilePath, filePathPatternMap, }) => {
    const matchingFilePathPattern = Object.keys(filePathPatternMap).find((filePathPattern) => micromatch.isMatch(relativeFilePath, filePathPattern, {}));
    if (matchingFilePathPattern) {
        return filePathPatternMap[matchingFilePathPattern];
    }
    return undefined;
};
const validateFieldData = ({ fieldDef, rawFieldData, documentFilePath, documentTypeDef, contentDirPath, }) => T.orDie(T.gen(function* ($) {
    const dataIsNil = rawFieldData === undefined || rawFieldData === null;
    if (dataIsNil && fieldDef.isRequired === false) {
        return O.none;
    }
    switch (fieldDef.type) {
        case 'list':
            return Array.isArray(rawFieldData)
                ? O.none
                : O.some(new FetchDataError.IncompatibleFieldDataError({
                    incompatibleFieldData: [[fieldDef.name, rawFieldData]],
                    documentFilePath,
                    documentTypeDef,
                }));
        // TODO also check for references in lists
        case 'reference':
            if (typeof rawFieldData === 'string') {
                const fullFilePath = filePathJoin(contentDirPath, rawFieldData);
                const fileExists = yield* $(fs.fileOrDirExists(fullFilePath), fileName_1 + ":217:38");
                if (!fileExists) {
                    return O.some(new FetchDataError.ReferencedFileDoesNotExistError({
                        referencedFilePath: rawFieldData,
                        fieldName: fieldDef.name,
                        documentFilePath,
                        documentTypeDef,
                    }));
                }
            }
        // TODO validate whether data has correct type (probably via zod)
        default:
            return O.none;
    }
}, fileName_1 + ":196:8"), fileName_1 + ":233:19");
const validateContentTypeMatchesFileExtension = ({ contentType, relativeFilePath, }) => {
    const extension = relativeFilePath.toLowerCase().split('.').pop();
    const validMarkdownExtensions = ['md', 'mdx'];
    const isInvalidMarkdownOrMdx = (contentType === 'markdown' || contentType === 'mdx') && validMarkdownExtensions.includes(extension) === false;
    const validDataExtensions = ['json', 'yaml', 'yml'];
    const isInvalidData = contentType === 'data' && validDataExtensions.includes(extension) === false;
    if (isInvalidMarkdownOrMdx || isInvalidData) {
        return new FetchDataError.FileExtensionMismatch({ contentType, extension, filePath: relativeFilePath });
    }
    return undefined;
};
//# sourceMappingURL=validateDocumentData.js.map