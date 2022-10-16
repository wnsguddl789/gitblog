import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/DocumentContext.ts";
import * as path from 'node:path';
import * as utils from '@contentlayer/utils';
import { T, tag } from '@contentlayer/utils/effect';
import { getFlattenedPath } from './mapping/index.js';
export const DocumentContext = tag(Symbol.for('@contentlayer/source-files/DocumentContext'));
export const provideDocumentContext = (_) => T.provideService(DocumentContext)(_, fileName_1 + ":24:96");
export const makeAndProvideDocumentContext = ({ rawContent, relativeFilePath, documentTypeDef, }) => {
    const contentType = utils.pattern
        .match(rawContent.kind)
        .with('markdown', () => 'markdown')
        .with('mdx', () => 'mdx')
        .otherwise(() => 'data');
    const rawDocumentData = {
        sourceFilePath: relativeFilePath,
        sourceFileName: path.basename(relativeFilePath),
        sourceFileDir: path.dirname(relativeFilePath),
        contentType,
        flattenedPath: getFlattenedPath(relativeFilePath),
    };
    return provideDocumentContext({ rawContent, rawDocumentData, relativeFilePath, documentTypeDef });
};
export const getFromDocumentContext = (key) => T.accessService(DocumentContext)((_) => _[key], fileName_1 + ":48:35");
//# sourceMappingURL=DocumentContext.js.map