import type { DocumentType, NestedType } from './index.js';
export declare type FieldDefType = FieldDef['type'];
/** Needed for the record-style field definitions */
export declare type FieldDefWithName = FieldDef & {
    name: string;
};
export declare type FieldDef = ListFieldDef | ListPolymorphicFieldDef | StringFieldDef | NumberFieldDef | BooleanFieldDef | JSONFieldDef | DateFieldDef | MarkdownFieldDef | MDXFieldDef | ImageFieldDef | EnumFieldDef | NestedFieldDef | NestedPolymorphicFieldDef | ReferenceFieldDef | ReferencePolymorphicFieldDef;
/**
 * Field name should contain only alphanumeric characters, underscore and a hyphen [A-Za-z0-9_].
 * Must start with a letter. Must not end with an underscore or a hyphen.
 */
interface FieldDefBase {
    /** Short description to editors how the field is to be used */
    description?: string;
    /**
     * Whether the field is required or not. Fields are optional by default.
     * @default false
     */
    required?: boolean;
}
export interface ListFieldDef extends FieldDefBase {
    type: 'list';
    default?: readonly any[];
    of: ListFieldDefItem.Item;
}
export interface ListPolymorphicFieldDef extends FieldDefBase {
    type: 'list';
    default?: readonly any[];
    of: readonly ListFieldDefItem.Item[];
    /**
     * Field needed to distiguish list data items at run time. Defaults to `fieldOptions.typeFieldName`
     * This option is only needed when using non-scalar `of` values (e.g. `nested`)
     */
    typeField?: string;
}
export declare const isListFieldDef: (_: FieldDef) => _ is ListFieldDef;
export declare const isListPolymorphicFieldDef: (_: FieldDef) => _ is ListPolymorphicFieldDef;
export declare namespace ListFieldDefItem {
    type Item = ItemString | ItemNumber | ItemBoolean | ItemJSON | ItemDate | ItemMarkdown | ItemMDX | ItemImage | ItemEnum | ItemNestedType | ItemDocumentReference;
    type ItemString = {
        type: 'string';
    };
    type ItemNumber = {
        type: 'number';
    };
    type ItemBoolean = {
        type: 'boolean';
    };
    type ItemJSON = {
        type: 'json';
    };
    type ItemDate = {
        type: 'date';
    };
    type ItemMarkdown = {
        type: 'markdown';
    };
    type ItemMDX = {
        type: 'mdx';
    };
    type ItemImage = {
        type: 'image';
    };
    type ItemEnum = {
        type: 'enum';
        options: readonly string[];
    };
    type ItemNestedType = NestedType;
    type ItemDocumentReference = DocumentType & {
        /**
         * Whether Contentlayer should embed the referenced document instead of the reference value (i.e. file path)
         *
         * @experimental
         * @default false
         */
        embedDocument?: boolean;
    };
    const isDefItemNested: (_: Item) => _ is ItemNestedType;
}
export declare type StringFieldDef = FieldDefBase & {
    type: 'string';
    default?: string;
};
export declare type NumberFieldDef = FieldDefBase & {
    type: 'number';
    default?: number;
};
export declare type BooleanFieldDef = FieldDefBase & {
    type: 'boolean';
    default?: boolean;
};
export declare type JSONFieldDef = FieldDefBase & {
    type: 'json';
    default?: any;
};
export declare type DateFieldDef = FieldDefBase & {
    type: 'date';
    default?: string;
};
export declare type MarkdownFieldDef = FieldDefBase & {
    type: 'markdown';
    default?: string;
};
export declare type MDXFieldDef = FieldDefBase & {
    type: 'mdx';
    default?: string;
};
export declare type ImageFieldDef = FieldDefBase & {
    type: 'image';
    default?: string;
};
export declare type EnumFieldDef = FieldDefBase & {
    type: 'enum';
    default?: any;
    options: readonly string[];
};
export declare type NestedFieldDef = FieldDefBase & {
    type: 'nested';
    of: NestedType;
    default?: any;
};
export declare const isNestedFieldDef: (_: FieldDef) => _ is NestedFieldDef;
export declare type NestedPolymorphicFieldDef = FieldDefBase & {
    type: 'nested';
    of: readonly NestedType[];
    /**
     * Field needed to distiguish list data items at run time. Defaults to `fieldOptions.typeFieldName`
     * This option is only needed when using non-scalar `of` values (e.g. `nested`)
     */
    typeField?: string;
    default?: any;
};
export declare const isNestedPolymorphicFieldDef: (_: FieldDef) => _ is NestedPolymorphicFieldDef;
/** Referenced documents are expected to be relative to `contentDirPath` */
export declare type ReferenceFieldDef = FieldDefBase & {
    type: 'reference';
    default?: string;
    of: DocumentType;
    /**
     * Whether Contentlayer should embed the referenced document instead of the reference value (i.e. file path)
     *
     * @experimental
     * @default false
     */
    embedDocument?: boolean;
};
export declare type ReferencePolymorphicFieldDef = FieldDefBase & {
    type: 'reference';
    default?: string;
    of: readonly DocumentType[];
    /**
     * Field needed to distiguish list data items at run time. Defaults to `fieldOptions.typeFieldName`
     * This option is only needed when using non-scalar `of` values (e.g. `nested`)
     */
    typeField?: string;
};
export declare const isReferencePolymorphicFieldDef: (_: FieldDef) => _ is ReferencePolymorphicFieldDef;
export {};
//# sourceMappingURL=field.d.ts.map