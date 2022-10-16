import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/cli/src/commands/DevCommand.ts";
import * as core from '@contentlayer/core';
import { errorToString } from '@contentlayer/utils';
import { E, pipe, S, T } from '@contentlayer/utils/effect';
import { BaseCommand } from './_BaseCommand.js';
export class DevCommand extends BaseCommand {
    constructor() {
        super(...arguments);
        this.executeSafe = () => (S.runDrain(S.tap_(S.chainSwitchMapEitherRight((config) => core.generateDotpkgStream({ config, verbose: this.verbose, isDev: true }))(S.tapRight((config) => config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig, fileName_1 + ":28:74"))(S.tapSkipFirstRight(() => T.log(`Contentlayer config change detected. Updating type definitions and data...`))(S.chain_(S.fromEffect(this.clearCacheIfNeeded()), () => core.getConfigWatch({ configPath: this.configPath }))))), E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo))));
    }
}
DevCommand.paths = [['dev']];
DevCommand.usage = {
    description: `Same as "contentlayer build" but with watch mode`,
    details: `
      TODO: Longer description 
    `,
    examples: [
        [`Simple run`, `$0 dev`],
        [`Clear cache before run`, `$0 dev --clearCache`],
    ],
};
//# sourceMappingURL=DevCommand.js.map