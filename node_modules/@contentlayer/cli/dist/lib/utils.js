import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/cli/src/lib/utils.ts";
export const derefDocumentOrThrow = (documentDefMap, documentDefName) => {
    if (!(documentDefName in documentDefMap)) {
        throw new Error(`No such DocumentTypeDef "${documentDefName}" in DocumentTypeDefMap: ${JSON.stringify(documentDefMap)}`);
    }
    return documentDefMap[documentDefName];
};
export const derefEmbeddedOrThrow = (nestedTypeDefMap, nestedTypeDefName) => {
    if (!(nestedTypeDefName in nestedTypeDefMap)) {
        throw new Error(`No such NestedTypeDef "${nestedTypeDefName}" in NestedTypeDefMap: ${JSON.stringify(nestedTypeDefMap)}`);
    }
    return nestedTypeDefMap[nestedTypeDefName];
};
//# sourceMappingURL=utils.js.map