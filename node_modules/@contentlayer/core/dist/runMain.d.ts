import type { HasCwd } from '@contentlayer/core';
import type { HasClock, HasConsole, OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
export declare const runMain: ({ tracingServiceName, verbose }: {
    tracingServiceName: string;
    verbose: boolean;
}) => (eff: T.Effect<OT.HasTracer & HasClock & HasCwd & HasConsole, unknown, unknown>) => Promise<void>;
//# sourceMappingURL=runMain.d.ts.map