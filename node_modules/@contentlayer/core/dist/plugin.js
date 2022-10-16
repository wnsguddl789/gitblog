import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/plugin.ts";
export const defaultFieldOptions = {
    bodyFieldName: 'body',
    typeFieldName: 'type',
};
export const processArgs = async (argsOrArgsThunk) => {
    const { extensions, fieldOptions, markdown, mdx, date, disableImportAliasWarning, ...restArgs } = typeof argsOrArgsThunk === 'function' ? await argsOrArgsThunk() : argsOrArgsThunk;
    const options = {
        markdown,
        mdx,
        date,
        fieldOptions: {
            bodyFieldName: fieldOptions?.bodyFieldName ?? defaultFieldOptions.bodyFieldName,
            typeFieldName: fieldOptions?.typeFieldName ?? defaultFieldOptions.typeFieldName,
        },
        disableImportAliasWarning: disableImportAliasWarning ?? false,
    };
    return { extensions: extensions ?? {}, options, restArgs };
};
//# sourceMappingURL=plugin.js.map