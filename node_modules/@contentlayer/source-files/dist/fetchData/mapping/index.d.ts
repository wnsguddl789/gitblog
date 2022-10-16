import type * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import type { HasConsole, OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
import type { HasDocumentContext } from '../DocumentContext.js';
import type { RawContent } from '../types.js';
export declare const makeDocument: ({ rawContent, documentTypeDef, coreSchemaDef, relativeFilePath, contentDirPath, options, }: {
    rawContent: RawContent;
    documentTypeDef: core.DocumentTypeDef;
    coreSchemaDef: core.SchemaDef;
    relativeFilePath: RelativePosixFilePath;
    contentDirPath: AbsolutePosixFilePath;
    options: core.PluginOptions;
}) => T.Effect<OT.HasTracer & HasConsole & HasDocumentContext & core.HasCwd, FetchDataError.UnexpectedError | FetchDataError.ImageError | FetchDataError.IncompatibleFieldDataError | FetchDataError.NoSuchNestedDocumentTypeError, core.Document>;
declare type MakeDocumentInternalError = core.UnexpectedMarkdownError | core.UnexpectedMDXError | FetchDataError.NoSuchNestedDocumentTypeError | FetchDataError.IncompatibleFieldDataError | FetchDataError.ImageError;
export declare const getFlattenedPath: (relativeFilePath: string) => string;
export declare const testOnly_getDataForFieldDef: ({ fieldDef, rawFieldData, documentTypeName, coreSchemaDef, options, documentFilePath, contentDirPath, }: {
    fieldDef: core.FieldDef;
    rawFieldData: any;
    documentTypeName: string;
    coreSchemaDef: core.SchemaDef;
    options: core.PluginOptions;
    documentFilePath: RelativePosixFilePath;
    contentDirPath: AbsolutePosixFilePath;
}) => T.Effect<OT.HasTracer & HasConsole & HasDocumentContext & core.HasCwd, MakeDocumentInternalError, any>;
export {};
//# sourceMappingURL=index.d.ts.map