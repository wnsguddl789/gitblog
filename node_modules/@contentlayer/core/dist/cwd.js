import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/cwd.ts";
import { unknownToAbsolutePosixFilePath } from '@contentlayer/utils';
import { T, tag } from '@contentlayer/utils/effect';
const CwdSymbol = Symbol();
export const makeCwd = T.gen(function* (_) {
    const cwd = yield* _(T.succeedWith(() => {
        const cwdValue = process.env.PWD ?? process.cwd();
        return unknownToAbsolutePosixFilePath(cwdValue);
    }, fileName_1 + ":9:18"), fileName_1 + ":8:23");
    return { serviceId: CwdSymbol, cwd };
}, fileName_1 + ":7:29");
export const Cwd = tag();
export const provideCwd = T.provideServiceM(Cwd)(makeCwd, fileName_1 + ":21:49");
export const getCwd = T.accessService(Cwd)((_) => _.cwd, fileName_1 + ":23:43");
//# sourceMappingURL=cwd.js.map