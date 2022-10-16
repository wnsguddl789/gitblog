import * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath } from '@contentlayer/utils';
import type { OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { HasDocumentContext } from '../DocumentContext.js';
export declare const makeMdxField: ({ mdxString, fieldDef, options, contentDirPath, }: {
    mdxString: string;
    fieldDef: core.FieldDef;
    options: core.PluginOptions;
    contentDirPath: AbsolutePosixFilePath;
}) => T.Effect<HasDocumentContext & OT.HasTracer, core.UnexpectedMDXError, core.MDX>;
//# sourceMappingURL=field-mdx.d.ts.map