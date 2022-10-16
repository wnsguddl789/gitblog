import * as core from '@contentlayer/core';
import { OT, T } from '@contentlayer/utils/effect';
import type { Usage } from 'clipanion';
import { BaseCommand } from './_BaseCommand.js';
export declare class BuildCommand extends BaseCommand {
    static paths: string[][];
    static usage: Usage;
    executeSafe: () => T.Effect<import("@contentlayer/utils/effect").HasConsole & import("@contentlayer/utils/effect").Has<core.Cwd> & import("@contentlayer/utils/effect").Has<import("@contentlayer/utils/effect/ConsoleService.js").ConsoleService> & OT.HasTracer & import("@contentlayer/utils/effect").Has<OT.Tracer> & core.HasCwd & import("@contentlayer/utils/effect").HasClock, import("@contentlayer/utils/node/fs.js").RmError | import("../../../core/src/getConfig/esbuild.js").UnknownEsbuildError | import("../../../core/src/getConfig/esbuild.js").KnownEsbuildError | core.NoConfigFoundError | import("@contentlayer/utils/node/fs.js").StatError | import("@contentlayer/utils/node/fs.js").UnknownFSError | import("@contentlayer/utils/node/fs.js").MkdirError | core.EsbuildBinNotFoundError | core.ConfigReadError | core.ConfigNoDefaultExportError | import("@contentlayer/utils/node/fs.js").ReadFileError | import("@contentlayer/utils/node/fs.js").JsonParseError | import("@contentlayer/utils/node/fs.js").WriteFileError | import("@contentlayer/utils/node/fs.js").JsonStringifyError | core.SourceProvideSchemaError | core.SourceFetchDataError, core.GenerateInfo>;
}
//# sourceMappingURL=BuildCommand.d.ts.map