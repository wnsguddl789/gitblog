import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/validate-tsconfig.ts";
import path from 'node:path';
import { filePathJoin } from '@contentlayer/utils';
import { Chunk, O, OT, pipe, T, Tagged } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { parse as parseJsonc } from 'comment-json';
import { getCwd } from './cwd.js';
export const validateTsconfig = (OT.withSpan('validateTsconfig')(T.gen(function* ($) {
    const cwd = yield* $(getCwd, fileName_1 + ":13:25");
    const possibleFileNames = ['tsconfig.json', 'jsconfig.json'].map((_) => filePathJoin(cwd, _));
    const tsconfigOption = yield* $((T.map_(T.map_(T.forEachPar_(possibleFileNames, tryParseFile, fileName_1 + ":20:21"), Chunk.toArray, fileName_1 + ":21:14"), (_) => O.getFirst(..._), fileName_1 + ":22:14")), fileName_1 + ":17:36");
    const warningMessage = (msg) => T.log(`\
Contentlayer (Warning): Importing from \`contentlayer\/generated\` might not work.
${msg}

For more information see https://www.contentlayer.dev/docs/getting-started
To disable this warning you can set \`disableImportAliasWarning: true\` in your Contentlayer config.
`);
    if (O.isNone(tsconfigOption)) {
        yield* $(warningMessage(`No tsconfig.json or jsconfig.json file found`), fileName_1 + ":36:15");
        return;
    }
    const { config, fileName } = tsconfigOption.value;
    if (config.compilerOptions?.baseUrl === undefined) {
        yield* $(warningMessage(`Config option \`compilerOptions.baseUrl\` not found in "${fileName}".`), fileName_1 + ":44:15");
        return;
    }
    if (config.compilerOptions?.paths === undefined) {
        yield* $(warningMessage(`Config option \`compilerOptions.paths\` not found in "${fileName}".`), fileName_1 + ":49:15");
        return;
    }
    const paths = Object.values(config.compilerOptions.paths).flat();
    if (!paths.some((_) => _.includes('./.contentlayer/generated'))) {
        yield* $(warningMessage(`No path alias found for "contentlayer/generated" via \`compilerOptions.paths\` in "${fileName}".`), fileName_1 + ":55:15");
    }
}, fileName_1 + ":12:8")));
const tryParseFile = (filePath) => (T.option(T.tapError_(T.map_(T.chain_(fs.readFile(filePath), (contents) => T.tryCatch(() => parseJsonc(contents, undefined, true), (error) => new InvalidTsconfigError({ error }), fileName_1 + ":69:17"), fileName_1 + ":68:12"), (config) => ({ fileName: path.basename(filePath), config }), fileName_1 + ":74:10"), (error) => T.succeedWith(() => {
    if (error._tag === 'InvalidTsconfigError' || error._tag === 'node.fs.ReadFileError') {
        console.log(`Contentlayer: Invalid jsconfig/tsconfig file found: ${filePath}`);
    }
}, fileName_1 + ":76:20"), fileName_1 + ":75:15"), fileName_1 + ":82:13"));
export class InvalidTsconfigError extends Tagged('InvalidTsconfigError') {
}
//# sourceMappingURL=validate-tsconfig.js.map