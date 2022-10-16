import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/next-contentlayer/src/plugin.ts";
import '@contentlayer/utils/effect/Tracing/Enable';
import * as core from '@contentlayer/core';
import { errorToString } from '@contentlayer/utils';
import { E, OT, pipe, S, T } from '@contentlayer/utils/effect';
/** Seems like the next.config.js export function might be executed multiple times, so we need to make sure we only run it once */
let contentlayerInitialized = false;
export const runContentlayerDev = async ({ configPath }) => {
    if (contentlayerInitialized)
        return;
    contentlayerInitialized = true;
    await (runMain(S.runDrain(S.tap_(S.chainSwitchMapEitherRight((config) => core.generateDotpkgStream({ config, verbose: false, isDev: true }))(S.tapRight((config) => (config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig, fileName_1 + ":21:94")))(S.tapSkipFirstRight(() => T.log(`Contentlayer config change detected. Updating type definitions and data...`))(core.getConfigWatch({ configPath })))), E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo)))));
};
export const runContentlayerBuild = async ({ configPath }) => {
    if (contentlayerInitialized)
        return;
    contentlayerInitialized = true;
    await (runMain(OT.withSpan('next-contentlayer:runContentlayerBuild')(T.tap_(T.chain_(core.getConfig({ configPath }), (config) => core.generateDotpkg({ config, verbose: false }), fileName_1 + ":35:12"), core.logGenerateInfo, fileName_1 + ":36:10"))));
};
const runMain = core.runMain({ tracingServiceName: 'next-contentlayer', verbose: process.env.CL_DEBUG !== undefined });
//# sourceMappingURL=plugin.js.map