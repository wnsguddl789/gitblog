import { E, M, OT, S, T } from '@contentlayer/utils/effect';
import * as esbuild from 'esbuild';
export declare const EsbuildWatcherTypeId: unique symbol;
export declare type EsbuildWatcherTypeId = typeof EsbuildWatcherTypeId;
export declare abstract class EsbuildWatcher {
    readonly [EsbuildWatcherTypeId]: EsbuildWatcherTypeId;
}
export declare type BuildResult = esbuild.BuildResult;
export declare type Plugin = esbuild.Plugin;
export declare type EsbuildError = UnknownEsbuildError | KnownEsbuildError;
declare const UnknownEsbuildError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"UnknownEsbuildError", "_tag">;
export declare class UnknownEsbuildError extends UnknownEsbuildError_base<{
    readonly error: unknown;
}> {
    toString: () => string;
}
declare const KnownEsbuildError_base: import("@effect-ts/system/Case").CaseConstructorTagged<"KnownEsbuildError", "_tag">;
export declare class KnownEsbuildError extends KnownEsbuildError_base<{
    readonly error: esbuild.BuildFailure;
}> {
    toString: () => string;
}
export declare const make: (buildOptions: esbuild.BuildOptions) => T.Effect<unknown, never, EsbuildWatcher>;
export declare const subscribe: (self: EsbuildWatcher) => M.Managed<unknown, never, S.Stream<unknown, never, E.Either<EsbuildError, esbuild.BuildResult>>>;
export declare const start: (self: EsbuildWatcher) => T.Effect<OT.HasTracer, never, void>;
export declare const makeAndSubscribeManaged: (buildOptions: esbuild.BuildOptions) => M.Managed<OT.HasTracer, never, S.Stream<unknown, never, E.Either<EsbuildError, esbuild.BuildResult>>>;
export declare const makeAndSubscribe: (buildOptions: esbuild.BuildOptions) => S.Stream<OT.HasTracer, never, E.Either<EsbuildError, esbuild.BuildResult>>;
export declare const shutdown: (self: EsbuildWatcher) => T.Effect<unknown, never, void>;
export {};
//# sourceMappingURL=esbuild.d.ts.map