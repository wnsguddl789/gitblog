import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/schema/defs/index.ts";
export * from './field.js';
export const isNestedTypeDef = (_) => _.hasOwnProperty('name');
export const isNestedUnnamedTypeDef = (_) => !_.hasOwnProperty('name');
export const defineNestedType = (def) => ({
    type: 'nested',
    def,
});
export const defineDocumentType = (def) => ({
    type: 'document',
    def,
});
//# sourceMappingURL=index.js.map