import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/markdown/mdx.ts";
import * as path from 'node:path';
import { errorToString } from '@contentlayer/utils';
import { OT, pipe, T, Tagged } from '@contentlayer/utils/effect';
import * as mdxBundler from 'mdx-bundler';
import { addRawDocumentToVFile } from './unified.js';
export const bundleMDX = ({ mdxString, options, contentDirPath, rawDocumentData, }) => (OT.withSpan('@contentlayer/core/markdown:bundleMDX')(T.mapError_(T.gen(function* ($) {
    // TODO should be fixed in `mdx-bundler`
    if (mdxString.length === 0) {
        return '';
    }
    const { rehypePlugins, remarkPlugins, resolveCwd, cwd: cwd_, ...restOptions } = options ?? {};
    const getCwdFromContentDirPath = () => 
    // TODO don't use `process.cwd()` but instead `HasCwd`
    path.isAbsolute(contentDirPath) ? contentDirPath : path.join(process.cwd(), contentDirPath);
    const getRelativeCwd = () => path.join(getCwdFromContentDirPath(), path.dirname(rawDocumentData.flattenedPath));
    const getCwd = () => (resolveCwd === 'contentDirPath' ? getCwdFromContentDirPath() : getRelativeCwd());
    const mdxOptions = {
        mdxOptions: (opts) => {
            opts.rehypePlugins = [...(opts.rehypePlugins ?? []), ...(rehypePlugins ?? [])];
            opts.remarkPlugins = [
                addRawDocumentToVFile(rawDocumentData),
                ...(opts.remarkPlugins ?? []),
                ...(remarkPlugins ?? []),
            ];
            return opts;
        },
        // User-provided cwd trumps resolution
        cwd: cwd_ ?? getCwd(),
        // NOTE `restOptions` should be spread at the end to allow for user overrides
        ...restOptions,
    };
    const res = yield* $(T.tryPromise(() => mdxBundler.bundleMDX({ source: mdxString, ...mdxOptions }), fileName_1 + ":55:40"), fileName_1 + ":55:27");
    if (res.errors.length > 0) {
        return yield* $(T.fail(res.errors, fileName_1 + ":58:31"), fileName_1 + ":58:24");
    }
    return res.code;
}, fileName_1 + ":24:10"), (error) => new UnexpectedMDXError({ error }), fileName_1 + ":63:15")));
export class UnexpectedMDXError extends Tagged('UnexpectedMDXError') {
    constructor() {
        super(...arguments);
        this.toString = () => `UnexpectedMDXError: ${errorToString(this.error)}`;
    }
}
//# sourceMappingURL=mdx.js.map