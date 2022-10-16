import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/cli/src/commands/DefaultCommand.ts";
import { OT, pipe, T } from '@contentlayer/utils/effect';
import { Command } from 'clipanion';
import { BaseCommand } from './_BaseCommand.js';
export class DefaultCommand extends BaseCommand {
    constructor() {
        super(...arguments);
        this.executeSafe = () => (OT.withSpan('@contentlayer/cli/commands/DefaultCommand:executeSafe', { attributes: { cwd: process.cwd() } })(T.succeedWith(() => console.log(this.cli.usage()), fileName_1 + ":11:20")));
    }
}
DefaultCommand.paths = [Command.Default];
//# sourceMappingURL=DefaultCommand.js.map