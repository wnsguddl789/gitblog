var _a, _b, _c, _d;
import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/node/fs-watcher.ts";
import * as T from '@effect-ts/core/Effect';
import * as Ex from '@effect-ts/core/Effect/Exit';
import * as S from '@effect-ts/core/Effect/Experimental/Stream';
import * as H from '@effect-ts/core/Effect/Hub';
import * as M from '@effect-ts/core/Effect/Managed';
import * as Q from '@effect-ts/core/Effect/Queue';
import * as Ref from '@effect-ts/core/Effect/Ref';
import * as E from '@effect-ts/core/Either';
import { pipe } from '@effect-ts/core/Function';
import * as O from '@effect-ts/core/Option';
import * as Chokidar from 'chokidar';
import { Tagged } from '../effect/index.js';
import { unknownFilePath } from '../file-paths.js';
export class FileAdded {
    constructor(path, stats) {
        this.path = path;
        this.stats = stats;
        this._tag = 'FileAdded';
    }
}
export class FileRemoved {
    constructor(path, stats) {
        this.path = path;
        this.stats = stats;
        this._tag = 'FileRemoved';
    }
}
export class FileChanged {
    constructor(path, stats) {
        this.path = path;
        this.stats = stats;
        this._tag = 'FileChanged';
    }
}
export class DirectoryAdded {
    constructor(path, stats) {
        this.path = path;
        this.stats = stats;
        this._tag = 'DirectoryAdded';
    }
}
export class DirectoryRemoved {
    constructor(path, stats) {
        this.path = path;
        this.stats = stats;
        this._tag = 'DirectoryRemoved';
    }
}
export const FileWatcherTypeId = Symbol();
export class FileWatcher {
    constructor() {
        this[_a] = FileWatcherTypeId;
    }
}
_a = FileWatcherTypeId;
class FileWatcherInternal extends FileWatcher {
    constructor() {
        super(...arguments);
        this[_b] = FileWatcherTypeId;
    }
}
_b = FileWatcherTypeId;
export const WatchErrorTypeId = Symbol();
export class FileWatcherError extends Tagged('FileWatcherError') {
    constructor() {
        super(...arguments);
        this[_c] = WatchErrorTypeId;
    }
}
_c = WatchErrorTypeId;
class ConcreteFileWatcher extends FileWatcherInternal {
    constructor(instance, fsEventsHub, paths, options) {
        super();
        this.instance = instance;
        this.fsEventsHub = fsEventsHub;
        this.paths = paths;
        this.options = options;
        this[_d] = FileWatcherTypeId;
    }
    shutdown() {
        return (T.catchAll_(T.chain_(Ref.get(this.instance), (_) => T.tryPromise(() => _.close(), fileName_1 + ":95:34"), fileName_1 + ":95:14"), (_) => T.unit, fileName_1 + ":96:17"));
    }
    add(paths) {
        return (T.chain_(Ref.get(this.instance), (_) => T.succeedWith(() => {
            _.add(paths);
        }, fileName_1 + ":105:22"), fileName_1 + ":104:14"));
    }
    remove(paths) {
        return (T.chain_(Ref.get(this.instance), (_) => T.succeedWith(() => {
            _.unwatch(paths);
        }, fileName_1 + ":117:22"), fileName_1 + ":116:14"));
    }
    subscribeToEvents() {
        return (T.chain_(Ref.get(this.instance), (_) => T.succeedWith(() => {
            _.on('error', (error) => {
                T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.left(new FileWatcherError({ origin: O.some(error) })))));
            });
            _.on('all', (eventName, path, stats) => {
                switch (eventName) {
                    case 'add':
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(new FileAdded(unknownFilePath(path), O.fromNullable(stats))))));
                        break;
                    case 'unlink':
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(new FileRemoved(unknownFilePath(path), O.fromNullable(stats))))));
                        break;
                    case 'change':
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(new FileChanged(unknownFilePath(path), O.fromNullable(stats))))));
                        break;
                    case 'addDir':
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(new DirectoryAdded(unknownFilePath(path), O.fromNullable(stats))))));
                        break;
                    case 'unlinkDir':
                        T.run(H.publish_(this.fsEventsHub, Ex.succeed(E.right(new DirectoryRemoved(unknownFilePath(path), O.fromNullable(stats))))));
                        break;
                }
            });
        }, fileName_1 + ":129:22"), fileName_1 + ":128:14"));
    }
    subscribe() {
        return (M.map_(M.chain_(H.subscribe(this.fsEventsHub), (_) => M.ensuringFirst_(M.succeed(S.fromQueue()(_), fileName_1 + ":185:48"), Q.shutdown(_), fileName_1 + ":185:38"), fileName_1 + ":185:14"), S.flattenExit, fileName_1 + ":186:12"));
    }
}
_d = FileWatcherTypeId;
function concrete(fileWatcher) {
    //
}
export function makeUnsafe(paths, options) {
    const instance = Ref.unsafeMakeRef(Chokidar.watch(paths, options));
    const hub = H.unsafeMakeUnbounded();
    return new ConcreteFileWatcher(instance, hub, paths, options);
}
// export function make(paths: readonly string[] | string, options?: Chokidar.WatchOptions): T.UIO<FileWatcher> {
//   console.log({ make: paths, options })
//   const x = Chokidar.watch(paths, options)
//   return pipe(
//     // T.succeedWith(() => Chokidar.watch(paths, options)),
//     T.succeedWith(() => console.log('start make')),
//     T.chain((_) => Ref.makeRef<Chokidar.FSWatcher>(x)),
//     // T.chain((_) => Ref.makeRef<Chokidar.FSWatcher>(_)),
//     // Ref.makeRef<Chokidar.FSWatcher>(x),
//     T.tap((_) => T.succeedWith(() => console.log({ ref: _ }))),
//     T.zip(H.makeUnbounded<Ex.Exit<never, E.Either<FileWatcherError, FileSystemEvent>>>()),
//     T.chain(({ tuple: [instance, hub] }) => {
//       console.log({ instance, hub })
//       return T.succeedWith(() => new ConcreteFileWatcher(instance, hub, paths, options))
//     }),
//     T.tap((_) => _.subscribeToEvents()),
//   )
// }
// export function make(paths: readonly string[] | string, options?: Chokidar.WatchOptions): T.UIO<FileWatcher> {
export function make(paths, options) {
    return (T.tap_(
    // T.tap(() => T.fail(new Error('test'))),
    T.chain_(T.zip_(
    // T.tap(() => T.succeedWith(() => console.log('start make'))),
    T.chain_(T.succeedWith(() => Chokidar.watch(paths, options), fileName_1 + ":230:18"), (_) => Ref.makeRef(_), fileName_1 + ":232:12"), H.makeUnbounded(), fileName_1 + ":233:10"), ({ tuple: [instance, hub] }) => T.succeedWith(() => new ConcreteFileWatcher(instance, hub, paths, options), fileName_1 + ":236:20"), fileName_1 + ":235:12"), (_) => _.subscribeToEvents(), fileName_1 + ":238:10"));
}
// export const makeAndSubscribe = (
//   paths: readonly string[] | string,
//   options?: Chokidar.WatchOptions,
// ): S.Stream<unknown, never, E.Either<FileWatcherError, FileSystemEvent>> =>
//   pipe(M.make_(make(paths, options), shutdown), M.chain(subscribe), S.unwrapManaged)
export const makeAndSubscribe = (paths, options) => (S.unwrapManaged(M.chain_(M.make_(make(paths, options), shutdown, fileName_1 + ":252:15"), subscribe, fileName_1 + ":252:56")));
export function subscribe(self) {
    concrete(self);
    return self.subscribe();
}
export function add_(self, paths) {
    concrete(self);
    return self.add(paths);
}
export function add(paths) {
    return (self) => add_(self, paths);
}
export function remove_(self, paths) {
    concrete(self);
    return self.remove(paths);
}
export function remove(paths) {
    return (self) => remove_(self, paths);
}
export function shutdown(self) {
    concrete(self);
    return self.shutdown();
}
//# sourceMappingURL=fs-watcher.js.map