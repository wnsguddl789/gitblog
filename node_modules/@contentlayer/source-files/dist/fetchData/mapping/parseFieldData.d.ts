import type * as core from '@contentlayer/core';
import type { RelativePosixFilePath } from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import * as zod from 'zod';
import { FetchDataError } from '../../errors/index.js';
declare const codecMap: {
    boolean: zod.ZodBoolean;
    number: zod.ZodNumber;
    string: zod.ZodString;
    date: zod.ZodString;
    enum: zod.ZodString;
    image: zod.ZodEffects<zod.ZodUnion<[zod.ZodString, zod.ZodObject<{
        src: zod.ZodString;
        alt: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
        alt?: string | undefined;
        src: string;
    }, {
        alt?: string | undefined;
        src: string;
    }>]>, {
        alt?: string | undefined;
        src: string;
    }, string | {
        alt?: string | undefined;
        src: string;
    }>;
    json: zod.ZodAny;
    list: zod.ZodArray<zod.ZodAny, "many">;
    list_polymorphic: zod.ZodArray<zod.ZodAny, "many">;
    markdown: zod.ZodString;
    mdx: zod.ZodString;
    nested: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    nested_polymorphic: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    nested_unnamed: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
    reference: zod.ZodString;
    reference_polymorphic: zod.ZodString;
};
export declare type ParsedFieldData<TFieldType extends core.FieldDefType> = zod.infer<typeof codecMap[TFieldType]>;
export declare const parseFieldData: <TFieldType extends "string" | "number" | "boolean" | "list" | "json" | "date" | "markdown" | "mdx" | "image" | "enum" | "nested" | "reference" | "list_polymorphic" | "nested_polymorphic" | "nested_unnamed" | "reference_polymorphic">({ rawData, fieldType, documentTypeDef, documentFilePath, fieldName, }: {
    rawData: unknown;
    fieldType: TFieldType;
    documentTypeDef: core.DocumentTypeDef;
    documentFilePath: RelativePosixFilePath;
    fieldName: string;
}) => T.Effect<unknown, FetchDataError.IncompatibleFieldDataError, ParsedFieldData<TFieldType>>;
export {};
//# sourceMappingURL=parseFieldData.d.ts.map