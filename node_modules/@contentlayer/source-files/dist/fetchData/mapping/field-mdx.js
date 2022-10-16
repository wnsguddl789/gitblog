import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/field-mdx.ts";
import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import { getFromDocumentContext } from '../DocumentContext.js';
export const makeMdxField = ({ mdxString, fieldDef, options, contentDirPath, }) => T.gen(function* ($) {
    const isBodyField = fieldDef.name === options.fieldOptions.bodyFieldName;
    const rawDocumentData = yield* $(getFromDocumentContext('rawDocumentData'), fileName_1 + ":23:37");
    // NOTE for the body field, we're passing the entire document file contents to MDX (e.g. in case some remark/rehype plugins need access to the frontmatter)
    // TODO we should come up with a better way to do this
    if (isBodyField) {
        const rawContent = yield* $(getFromDocumentContext('rawContent'), fileName_1 + ":27:34");
        if (rawContent.kind !== 'mdx' && rawContent.kind !== 'markdown')
            return utils.assertNever(rawContent);
        const code = yield* $(core.bundleMDX({
            mdxString: rawContent.rawDocumentContent,
            options: options?.mdx,
            contentDirPath,
            rawDocumentData,
        }), fileName_1 + ":30:28");
        return { raw: mdxString, code };
    }
    else {
        const code = yield* $(core.bundleMDX({ mdxString, options: options?.mdx, contentDirPath, rawDocumentData }), fileName_1 + ":40:28");
        return { raw: mdxString, code };
    }
}, fileName_1 + ":21:8");
//# sourceMappingURL=field-mdx.js.map