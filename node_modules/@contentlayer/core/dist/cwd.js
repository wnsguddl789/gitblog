import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/cwd.ts";
import { unknownToPosixFilePath } from '@contentlayer/utils';
import { T, tag } from '@contentlayer/utils/effect';
const CwdSymbol = Symbol();
export const makeCwd = T.gen(function* (_) {
    const cwd = yield* _(T.succeedWith(() => {
        // `process.env.INIT_CWD` is set by `yarn` or `npm` during installation
        const cwdValue = process.env.INIT_CWD ?? process.cwd();
        return unknownToPosixFilePath(cwdValue);
    }, fileName_1 + ":9:18"), fileName_1 + ":8:23");
    return { serviceId: CwdSymbol, cwd };
}, fileName_1 + ":7:29");
export const Cwd = tag();
export const provideCwd = T.provideServiceM(Cwd)(makeCwd, fileName_1 + ":22:49");
export const getCwd = T.accessService(Cwd)((_) => _.cwd, fileName_1 + ":24:43");
//# sourceMappingURL=cwd.js.map