import type { Document } from '../data-types.js';
import type { FieldDef, FieldDefType } from './field.js';
import type { StackbitExtension } from './stackbit-extension.js';
export * from './field.js';
export * from './validate.js';
export * from './stackbit-extension.js';
export declare type TypeDefExtensions = {
    stackbit?: StackbitExtension.TypeExtension;
};
export declare type DocumentTypeDefMap = Record<string, DocumentTypeDef>;
export declare type NestedTypeDefMap = Record<string, NestedTypeDef>;
export declare type SchemaDef = {
    documentTypeDefMap: DocumentTypeDefMap;
    nestedTypeDefMap: NestedTypeDefMap;
    /** Hash of the schema def which can be used e.g. for caching purposes. */
    hash: string;
};
export declare type DocumentTypeDef = {
    readonly _tag: 'DocumentTypeDef';
    /** Sometimes also called "id" */
    name: string;
    description: string | undefined;
    isSingleton: boolean;
    fieldDefs: FieldDef[];
    computedFields: ComputedField[];
    extensions: TypeDefExtensions;
};
export declare type NestedTypeDef = {
    readonly _tag: 'NestedTypeDef';
    name: string;
    description: string | undefined;
    fieldDefs: FieldDef[];
    extensions: TypeDefExtensions;
};
export declare type NestedUnnamedTypeDef = {
    readonly _tag: 'NestedUnnamedTypeDef';
    fieldDefs: FieldDef[];
    extensions: TypeDefExtensions;
};
export declare type ComputedField = {
    name: string;
    description: string | undefined;
    type: FieldDefType;
    resolve: ComputedFieldResolver;
};
export declare type ComputedFieldResolver = (_: Document) => FieldDefType | Promise<FieldDefType>;
//# sourceMappingURL=index.d.ts.map