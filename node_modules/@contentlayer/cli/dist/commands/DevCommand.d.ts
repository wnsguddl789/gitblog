import * as core from '@contentlayer/core';
import { T } from '@contentlayer/utils/effect';
import type { Usage } from 'clipanion';
import { BaseCommand } from './_BaseCommand.js';
export declare class DevCommand extends BaseCommand {
    static paths: string[][];
    static usage: Usage;
    executeSafe: () => T.Effect<import("@contentlayer/utils/effect").Has<core.Cwd> & import("@effect-ts/otel").HasTracer & import("@contentlayer/utils/effect").Has<import("@contentlayer/utils/effect/ConsoleService.js").ConsoleService> & core.HasCwd & import("@contentlayer/utils/effect").Has<import("@effect-ts/otel").Tracer> & import("@contentlayer/utils/effect").HasClock & import("@contentlayer/utils/effect").HasConsole, import("@contentlayer/utils/node/fs.js").RmError, void>;
}
//# sourceMappingURL=DevCommand.d.ts.map