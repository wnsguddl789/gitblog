import type { GetDocumentTypeMapGen } from '@contentlayer/core';
import type { LocalDocument } from '../../types.js';
import type { FieldDefType } from './index.js';
export declare type ComputedField<DocumentTypeName extends string = string> = {
    description?: string;
    type: FieldDefType;
    resolve: ComputedFieldResolver<DocumentTypeName>;
};
declare type ComputedFieldResolver<DocumentTypeName extends string> = (_: GetDocumentTypeGen<DocumentTypeName>) => any | Promise<any>;
declare type GetDocumentTypeGen<Name extends string> = Name extends keyof GetDocumentTypeMapGen<LocalDocument> ? GetDocumentTypeMapGen<LocalDocument>[Name] : LocalDocument;
export {};
//# sourceMappingURL=computed-field.d.ts.map