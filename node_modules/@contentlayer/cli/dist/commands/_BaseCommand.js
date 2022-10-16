import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/cli/src/commands/_BaseCommand.ts";
import * as core from '@contentlayer/core';
import { pipe, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { Command, Option } from 'clipanion';
import * as t from 'typanion';
export class BaseCommand extends Command {
    constructor() {
        super(...arguments);
        this.configPath = Option.String('-c,--config', {
            description: 'Path to the config (default: contentlayer.config.ts/js)',
            validator: t.isString(),
            required: false,
        });
        this.clearCache = Option.Boolean('--clearCache', false, {
            description: 'Whether to clear the cache before running the command',
        });
        this.verbose = Option.Boolean('--verbose', false, {
            description: 'More verbose logging and error stack traces',
        });
        this.execute = () => (core.runMain({
            tracingServiceName: 'contentlayer-cli',
            verbose: this.verbose || process.env.CL_DEBUG !== undefined,
        })(this.executeSafe()));
        this.clearCacheIfNeeded = () => {
            const { clearCache } = this;
            return T.gen(function* ($) {
                if (clearCache) {
                    const cwd = yield* $(core.getCwd, fileName_1 + ":40:29");
                    const artifactsDir = core.ArtifactsDir.getDirPath({ cwd });
                    yield* $(fs.rm(artifactsDir, { recursive: true, force: true }), fileName_1 + ":42:17");
                    yield* $(T.log('Cache cleared successfully'), fileName_1 + ":43:17");
                }
            }, fileName_1 + ":38:17");
        };
    }
}
//# sourceMappingURL=_BaseCommand.js.map