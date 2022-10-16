import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/effect/ConsoleService.ts";
import * as T from '@effect-ts/core/Effect';
import * as L from '@effect-ts/core/Effect/Layer';
import { tag } from '@effect-ts/core/Has';
export const makeLiveConsole = T.succeedWith(() => ({
    log: (...msg) => T.succeedWith(() => {
        console.log(...msg);
    }, fileName_1 + ":9:18"),
}), fileName_1 + ":7:45");
export const ConsoleService = tag();
export const LiveConsole = L.fromEffect_(makeLiveConsole, ConsoleService);
export const provideConsole = T.provideSomeLayer(LiveConsole);
export const { log } = T.deriveLifted(ConsoleService)(['log'], [], []);
export const provideTestConsole = (messages) => T.provideServiceM(ConsoleService)(T.succeedWith(() => ({
    log: (message) => T.succeedWith(() => {
        messages.push(message);
    }, fileName_1 + ":28:22"),
}), fileName_1 + ":26:18"), fileName_1 + ":25:36");
//# sourceMappingURL=ConsoleService.js.map