import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/effect/Option.ts";
import { Option } from '@effect-ts/core';
export * from '@effect-ts/core/Option';
export const getUnsafe = (option) => {
    if (Option.isSome(option)) {
        return option.value;
    }
    throw new Error('Option.getUnsafe: Option is None');
};
//# sourceMappingURL=Option.js.map