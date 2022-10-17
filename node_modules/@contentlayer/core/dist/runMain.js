import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/runMain.ts";
import { provideCwd } from '@contentlayer/core';
import * as core from '@contentlayer/core';
import { DummyTracing, provideDummyTracing, provideJaegerTracing } from '@contentlayer/utils';
import { Cause, pipe, pretty, provideConsole, T } from '@contentlayer/utils/effect';
import { getContentlayerVersion } from '@contentlayer/utils/node';
import * as os from 'node:os';
export const runMain = ({ tracingServiceName, verbose }) => (eff) => (T.runPromise(provideConsole(T.gen(function* ($) {
    if (process.platform === 'win32') {
        yield* $(T.log('Warning: Contentlayer might not work as expected on Windows'), fileName_1 + ":16:19");
    }
    // Only use Otel tracing if explicitly enabled via env var
    const provideTracing = process.env.CL_OTEL !== undefined ? provideJaegerTracing(tracingServiceName) : provideDummyTracing;
    const result = yield* $((T.result(provideCwd(provideTracing(eff)), fileName_1 + ":23:79")), fileName_1 + ":23:32");
    if (result._tag === 'Failure') {
        const failOrCause = Cause.failureOrCause(result.cause);
        const errorWasManaged = failOrCause._tag === 'Left';
        if (!errorWasManaged) {
            yield* $(T.log(`\
This error shouldn't have happened. Please consider opening a GitHub issue with the stack trace below here:
https://github.com/contentlayerdev/contentlayer/issues`), fileName_1 + ":30:21");
        }
        // If failure was a managed error and no `--verbose` flag was provided, print the error message
        if (errorWasManaged && !verbose) {
            if (!core.isSourceFetchDataError(failOrCause.left) || !failOrCause.left.alreadyHandled) {
                yield* $(T.log(failOrCause.left), fileName_1 + ":40:23");
            }
        }
        // otherwise for unmanaged errors or with `--verbose` flag provided, print the entire stack trace
        else {
            yield* $(T.log(pretty(result.cause)), fileName_1 + ":45:21");
            const contentlayerVersion = yield* $(T.provide_(getContentlayerVersion(), DummyTracing, fileName_1 + ":47:90"), fileName_1 + ":47:49");
            yield* $(T.log(`
OS: ${process.platform} ${os.release()} (arch: ${process.arch})
Process: ${process.argv.join(' ')}
Node version: ${process.version}
Contentlayer version: ${contentlayerVersion}
`), fileName_1 + ":49:21");
        }
        yield* $(T.succeedWith(() => process.exit(1), fileName_1 + ":59:33"), fileName_1 + ":59:19");
    }
}, fileName_1 + ":14:12"))));
//# sourceMappingURL=runMain.js.map