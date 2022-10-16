import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/field-markdown.ts";
import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import { getFromDocumentContext } from '../DocumentContext.js';
export const makeMarkdownField = ({ mdString, fieldDef, options, }) => T.gen(function* ($) {
    const isBodyField = fieldDef.name === options.fieldOptions.bodyFieldName;
    const rawDocumentData = yield* $(getFromDocumentContext('rawDocumentData'), fileName_1 + ":20:37");
    // NOTE for the body field, we're passing the entire document file contents to MDX (e.g. in case some remark/rehype plugins need access to the frontmatter)
    // TODO we should come up with a better way to do this
    if (isBodyField) {
        const rawContent = yield* $(getFromDocumentContext('rawContent'), fileName_1 + ":24:34");
        if (rawContent.kind !== 'markdown' && rawContent.kind !== 'mdx')
            return utils.assertNever(rawContent);
        const html = yield* $(core.markdownToHtml({
            mdString: rawContent.rawDocumentContent,
            options: options?.markdown,
            rawDocumentData,
        }), fileName_1 + ":27:28");
        return { raw: mdString, html };
    }
    else {
        const html = yield* $(core.markdownToHtml({ mdString: mdString, options: options?.markdown, rawDocumentData }), fileName_1 + ":36:28");
        return { raw: mdString, html };
    }
}, fileName_1 + ":18:8");
//# sourceMappingURL=field-markdown.js.map