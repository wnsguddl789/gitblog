import type { Has } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
declare const CwdSymbol: unique symbol;
export declare const makeCwd: T.Effect<unknown, never, {
    readonly serviceId: typeof CwdSymbol;
    readonly cwd: import("@contentlayer/utils").AbsolutePosixFilePath;
}>;
export interface Cwd extends T.OutputOf<typeof makeCwd> {
}
export declare const Cwd: import("@effect-ts/system/Has").Tag<Cwd>;
export declare const provideCwd: <R1, E1, A1>(ma: T.Effect<R1 & Has<Cwd>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const getCwd: T.Effect<Has<Cwd>, never, import("@contentlayer/utils").AbsolutePosixFilePath>;
export declare type HasCwd = Has<Cwd>;
export {};
//# sourceMappingURL=cwd.d.ts.map