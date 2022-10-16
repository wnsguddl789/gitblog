import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/parseFieldData.ts";
import { T } from '@contentlayer/utils/effect';
import * as zod from 'zod';
import { FetchDataError } from '../../errors/index.js';
const ParsedImageData = zod.object({
    src: zod.string(),
    alt: zod.string().optional(),
});
const ImageData = zod.union([zod.string(), ParsedImageData]).transform((_) => {
    if (typeof _ === 'string') {
        return { src: _ };
    }
    return _;
});
const codecMap = {
    boolean: zod.boolean(),
    number: zod.number(),
    string: zod.string(),
    date: zod.string(),
    enum: zod.string(),
    image: ImageData,
    json: zod.any(),
    list: zod.array(zod.any()),
    list_polymorphic: zod.array(zod.any()),
    markdown: zod.string(),
    mdx: zod.string(),
    nested: zod.record(zod.any()),
    nested_polymorphic: zod.record(zod.any()),
    nested_unnamed: zod.record(zod.any()),
    reference: zod.string(),
    reference_polymorphic: zod.string(),
};
export const parseFieldData = ({ rawData, fieldType, documentTypeDef, documentFilePath, fieldName, }) => {
    const result = codecMap[fieldType].safeParse(rawData);
    if (result.success) {
        return T.succeed(result.data, fileName_1 + ":57:21");
    }
    else {
        return T.fail(new FetchDataError.IncompatibleFieldDataError({
            documentTypeDef,
            documentFilePath,
            incompatibleFieldData: [[fieldName, rawData]],
        }), fileName_1 + ":59:18");
    }
};
//# sourceMappingURL=parseFieldData.js.map