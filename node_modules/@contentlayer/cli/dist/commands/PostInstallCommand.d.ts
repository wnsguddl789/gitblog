import * as core from '@contentlayer/core';
import { OT, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { BaseCommand } from './_BaseCommand.js';
export declare class PostInstallCommand extends BaseCommand {
    static paths: string[][];
    executeSafe: () => T.Effect<OT.HasTracer & core.HasCwd & import("@contentlayer/utils/effect").HasConsole & import("@contentlayer/utils/effect").Has<core.Cwd> & import("@contentlayer/utils/effect").Has<OT.Tracer>, import("../../../core/src/getConfig/esbuild.js").EsbuildError | fs.StatError | fs.UnknownFSError | fs.MkdirError | core.EsbuildBinNotFoundError | core.ConfigReadError | core.ConfigNoDefaultExportError | import("@contentlayer/utils/node").GetContentlayerVersionError | fs.WriteFileError | core.SourceProvideSchemaError | fs.FileNotFoundError, void>;
}
//# sourceMappingURL=PostInstallCommand.d.ts.map