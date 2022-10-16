import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/getConfig/index.ts";
import * as path from 'node:path';
import { Array, Chunk, O, OT, pipe, S, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { getCwd } from '../cwd.js';
import { ConfigNoDefaultExportError, ConfigReadError, NoConfigFoundError } from '../errors.js';
import { ArtifactsDir } from '../index.js';
import * as esbuild from './esbuild.js';
export const getConfig = ({ configPath, }) => (OT.withSpan('@contentlayer/core/getConfig:getConfig', { attributes: { configPath } })(T.rightOrFail(T.map_(S.runCollect(S.take_(getConfigWatch({ configPath }), 1)), Chunk.unsafeHead, fileName_1 + ":41:10"), fileName_1 + ":42:18")));
export const getConfigWatch = ({ configPath: configPath_, }) => {
    const resolveParams = (T.either(T.chainMergeObject(() => makeTmpDirAndResolveEntryPoint)(T.structPar({ configPath: resolveConfigPath({ configPath: configPath_ }), cwd: getCwd }, fileName_1 + ":52:16")), fileName_1 + ":54:13"));
    return (S.chainMapEitherRight(({ configPath, outfilePath, cwd }) => (S.mapEffectEitherRight((result) => getConfigFromResult({ result, configPath }))(esbuild.makeAndSubscribe({
        entryPoints: [configPath],
        entryNames: '[name]-[hash]',
        outfile: outfilePath,
        sourcemap: true,
        platform: 'node',
        target: 'es2020',
        format: 'esm',
        // needed in case models are co-located with React components
        jsx: 'transform',
        bundle: true,
        logLevel: 'silent',
        metafile: true,
        absWorkingDir: cwd,
        plugins: [contentlayerGenPlugin(), makeAllPackagesExternalPlugin(configPath)],
    }))))(S.fromEffect(resolveParams)));
};
const resolveConfigPath = ({ configPath, }) => T.gen(function* ($) {
    const cwd = yield* $(getCwd, fileName_1 + ":89:25");
    if (configPath) {
        if (path.isAbsolute(configPath)) {
            return configPath;
        }
        return path.join(cwd, configPath);
    }
    const defaultFilePaths = [path.join(cwd, 'contentlayer.config.ts'), path.join(cwd, 'contentlayer.config.js')];
    const foundDefaultFiles = yield* $((T.map_(T.forEachPar_(defaultFilePaths, fs.fileOrDirExists, fileName_1 + ":100:75"), Chunk.toArray, fileName_1 + ":100:102")), fileName_1 + ":100:39");
    const foundDefaultFile = defaultFilePaths[foundDefaultFiles.findIndex((_) => _)];
    if (foundDefaultFile) {
        return foundDefaultFile;
    }
    return yield* $(T.fail(new NoConfigFoundError({ cwd, configPath }), fileName_1 + ":106:27"), fileName_1 + ":106:20");
}, fileName_1 + ":88:8");
const makeTmpDirAndResolveEntryPoint = (T.map_(ArtifactsDir.mkdirCache, (cacheDir) => ({ outfilePath: path.join(cacheDir, 'compiled-contentlayer-config.mjs') }), fileName_1 + ":111:8"));
const getConfigFromResult = ({ result, configPath, }) => (T.either(OT.withSpan('@contentlayer/core/getConfig:getConfigFromResult', { attributes: { configPath } })(T.gen(function* ($) {
    const unknownWarnings = result.warnings.filter((warning) => warning.text.match(/Import \".*\" will always be undefined because the file \"contentlayer-gen:.contentlayer\/(data|types)\" has no exports/) === null);
    if (unknownWarnings.length > 0) {
        console.error(`Contentlayer esbuild warnings:`);
        console.error(unknownWarnings);
    }
    const cwd = yield* $(getCwd, fileName_1 + ":136:27");
    // Deriving the exact outfilePath here since it's suffixed with a hash
    const outfilePath = (O.getUnsafe(
    // Needs to be absolute path for ESM import to work
    O.map_(
    // Will look like `path.join(cacheDir, 'compiled-contentlayer-config-[SOME_HASH].mjs')
    Array.find_(Object.keys(result.metafile.outputs), (_) => _.match(/compiled-contentlayer-config-.+.mjs$/) !== null), (_) => path.join(cwd, _))));
    const esbuildHash = outfilePath.match(/compiled-contentlayer-config-(.+).mjs$/)[1];
    // TODO make a simple OT call via `addAttributes`
    yield* $(OT.addAttribute('outfilePath', outfilePath), fileName_1 + ":151:15");
    yield* $(OT.addAttribute('esbuildHash', esbuildHash), fileName_1 + ":152:15");
    // Needed in order for source maps of dynamic file to work
    yield* $((OT.withSpan('load-source-map-support')(T.tryCatchPromise(async () => (await import('source-map-support')).install(), (error) => new ConfigReadError({ error, configPath }), fileName_1 + ":157:28"))), fileName_1 + ":155:15");
    // NOTES:
    // 1) `?x=` suffix needed in case of re-loading when watching the config file for changes
    // 2) `file://` prefix is needed for Windows to work properly
    const importFresh = async (modulePath) => import(`file://${modulePath}?x=${new Date()}`);
    const exports = yield* $((OT.withSpan('import-compiled-contentlayer-config')(T.tryCatchPromise(() => importFresh(outfilePath), (error) => new ConfigReadError({ error, configPath }), fileName_1 + ":172:28"))), fileName_1 + ":170:31");
    if (!('default' in exports)) {
        return yield* $(T.fail(new ConfigNoDefaultExportError({ configPath, availableExports: Object.keys(exports) }), fileName_1 + ":181:31"), fileName_1 + ":181:24");
    }
    // Note currently `makeSource` returns a Promise but we should reconsider that design decision
    const source = yield* $((OT.withSpan('resolve-source-plugin-promise')(T.tryCatchPromise(async () => exports.default, (error) => new ConfigReadError({ error, configPath }), fileName_1 + ":187:28"))), fileName_1 + ":185:44");
    return { source, esbuildHash };
}, fileName_1 + ":123:10")), fileName_1 + ":198:13"));
/**
 * This esbuild plugin is needed in some cases where users import code that imports from '.contentlayer/*'
 * (e.g. when co-locating document type definitions with React components).
 */
const contentlayerGenPlugin = () => ({
    name: 'contentlayer-gen',
    setup(build) {
        build.onResolve({ filter: /contentlayer\/generated/ }, (args) => ({
            path: args.path,
            namespace: 'contentlayer-gen',
        }));
        build.onLoad({ filter: /.*/, namespace: 'contentlayer-gen' }, () => ({
            contents: '// empty',
        }));
    },
});
// TODO also take tsconfig.json `paths` mapping into account
const makeAllPackagesExternalPlugin = (configPath) => ({
    name: 'make-all-packages-external',
    setup: (build) => {
        const filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/; // Must not start with "/" or "./" or "../"
        build.onResolve({ filter }, (args) => {
            // avoid marking config file as external
            if (args.path.includes(configPath)) {
                return { path: args.path, external: false };
            }
            return { path: args.path, external: true };
        });
    },
});
//# sourceMappingURL=index.js.map