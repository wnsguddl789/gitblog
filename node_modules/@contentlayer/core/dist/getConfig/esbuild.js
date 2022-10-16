var _a, _b;
import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/getConfig/esbuild.ts";
import { errorToString } from '@contentlayer/utils';
import { E, Ex, H, M, O, OT, pipe, Q, Ref, S, T, Tagged } from '@contentlayer/utils/effect';
import * as esbuild from 'esbuild';
export const EsbuildWatcherTypeId = Symbol();
export class EsbuildWatcher {
    constructor() {
        this[_a] = EsbuildWatcherTypeId;
    }
}
_a = EsbuildWatcherTypeId;
export class UnknownEsbuildError extends Tagged('UnknownEsbuildError') {
    constructor() {
        super(...arguments);
        this.toString = () => `UnknownEsbuildError: ${errorToString(this.error)}`;
    }
}
export class KnownEsbuildError extends Tagged('KnownEsbuildError') {
    constructor() {
        super(...arguments);
        this.toString = () => `KnownEsbuildError: ${JSON.stringify(this.error, null, 2)}`;
    }
}
class ConcreteEsbuildWatcher {
    constructor(initialBuildResult, buildOptions, fsEventsHub) {
        this.initialBuildResult = initialBuildResult;
        this.buildOptions = buildOptions;
        this.fsEventsHub = fsEventsHub;
        this[_b] = EsbuildWatcherTypeId;
        this.shutdown = (T.catchAll_(T.chain_(Ref.get(this.initialBuildResult), (initialBuildResult) => {
            if (O.isSome(initialBuildResult)) {
                return T.tryCatch(() => initialBuildResult.value.stop(), (error) => new UnknownEsbuildError({ error }), fileName_1 + ":39:26");
            }
            console.log(`This shouldn't happen. Seems like esbuild watcher wasn't running (yet).`);
            return T.unit;
        }, fileName_1 + ":37:12"), (_) => T.unit, fileName_1 + ":47:15"));
        this.start = (T.catchAll_(T.tap_(T.tap_(OT.withSpan('esbuild', { attributes: { buildOptions: JSON.stringify(this.buildOptions) } })(T.tryCatchPromise(() => esbuild.build({
            ...this.buildOptions,
            watch: {
                onRebuild: (error, result) => {
                    if (error) {
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.left(new KnownEsbuildError({ error })))));
                    }
                    else {
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(result))));
                    }
                },
            },
        }), (error) => new UnknownEsbuildError({ error }), fileName_1 + ":51:22")), (initialBuildResult) => Ref.set_(this.initialBuildResult, O.some(initialBuildResult)), fileName_1 + ":68:10"), (initialBuildResult) => H.publish_(this.fsEventsHub, Ex.succeed(E.right(initialBuildResult))), fileName_1 + ":69:10"), (error) => H.publish_(this.fsEventsHub, Ex.succeed(E.left(error))), fileName_1 + ":70:15"));
        this.subscribe = (M.map_(M.chain_(H.subscribe(this.fsEventsHub), (_) => M.ensuringFirst_(M.succeed(S.fromQueue()(_), fileName_1 + ":75:46"), Q.shutdown(_), fileName_1 + ":75:36"), fileName_1 + ":75:12"), S.flattenExit, fileName_1 + ":76:10"));
    }
}
_b = EsbuildWatcherTypeId;
function concrete(esbuildWatcher) {
    //
}
export const make = (buildOptions) => (T.chain_(T.zip_(Ref.makeRef(O.none), H.makeUnbounded(), fileName_1 + ":87:10"), ({ tuple: [initialBuildResult, hub] }) => T.succeedWith(() => new ConcreteEsbuildWatcher(initialBuildResult, buildOptions, hub), fileName_1 + ":89:20"), fileName_1 + ":88:12"));
export const subscribe = (self) => {
    concrete(self);
    return self.subscribe;
};
export const start = (self) => {
    concrete(self);
    return self.start;
};
// export const makeAndSubscribeManaged = (
//   buildOptions: esbuild.BuildOptions,
// ): M.Managed<unknown, UnknownEsbuildError, S.Stream<unknown, never, E.Either<EsbuildError, esbuild.BuildResult>>> =>
//   pipe(M.make_(make(buildOptions), shutdown), M.chain(subscribe))
export const makeAndSubscribeManaged = (buildOptions) => (M.chain_(M.make_(make(buildOptions), shutdown, fileName_1 + ":117:12"), (esbuildWatcher) => (M.tap_(subscribe(esbuildWatcher), () => T.toManaged(start(esbuildWatcher)), fileName_1 + ":121:14")), fileName_1 + ":118:12"));
export const makeAndSubscribe = (buildOptions) => (S.unwrapManaged(makeAndSubscribeManaged(buildOptions)));
export const shutdown = (self) => {
    concrete(self);
    return self.shutdown;
};
//# sourceMappingURL=esbuild.js.map