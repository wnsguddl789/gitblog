import * as core from '@contentlayer/core';
import type { HasConsole, OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import type { HasDocumentContext } from '../DocumentContext.js';
export declare const makeMarkdownField: ({ mdString, fieldDef, options, }: {
    mdString: string;
    fieldDef: core.FieldDef;
    options: core.PluginOptions;
}) => T.Effect<HasDocumentContext & OT.HasTracer & HasConsole, core.UnexpectedMarkdownError, core.Markdown>;
//# sourceMappingURL=field-markdown.d.ts.map