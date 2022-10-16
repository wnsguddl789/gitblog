import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/cli/src/commands/BuildCommand.ts";
import * as core from '@contentlayer/core';
import { OT, pipe, T } from '@contentlayer/utils/effect';
import { BaseCommand } from './_BaseCommand.js';
export class BuildCommand extends BaseCommand {
    constructor() {
        super(...arguments);
        this.executeSafe = () => (OT.withSpan('@contentlayer/cli/commands/BuildCommand:executeSafe')(T.tap_(T.chain_(T.tap_(T.chain_(this.clearCacheIfNeeded(), () => core.getConfig({ configPath: this.configPath }), fileName_1 + ":24:14"), (config) => (config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig, fileName_1 + ":25:91")), fileName_1 + ":25:12"), (config) => core.generateDotpkg({ config, verbose: this.verbose }), fileName_1 + ":26:14"), core.logGenerateInfo, fileName_1 + ":27:12")));
    }
}
BuildCommand.paths = [['build']];
BuildCommand.usage = {
    description: `Transforms your content into static data`,
    details: `
      TODO: Longer description 
    `,
    examples: [
        [`Simple run`, `$0 build`],
        [`Clear cache before run`, `$0 build --clearCache`],
    ],
};
//# sourceMappingURL=BuildCommand.js.map