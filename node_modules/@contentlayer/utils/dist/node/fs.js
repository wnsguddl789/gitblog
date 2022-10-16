import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/node/fs.ts";
import { promises as fs } from 'node:fs';
import { pipe } from '@effect-ts/core';
import { Tagged } from '@effect-ts/core/Case';
import * as OT from '@effect-ts/otel';
import { T } from '../effect/index.js';
import { errorToString } from '../index.js';
export const fileOrDirExists = (pathLike) => {
    return (OT.withSpan('fileOrDirExists', { attributes: { pathLike } })(T.tap_(T.catchTag_(T.map_(stat(pathLike), (stat_) => stat_.isFile() || stat_.isDirectory(), fileName_1 + ":15:10"), 'node.fs.FileNotFoundError', () => T.succeed(false, fileName_1 + ":16:60"), fileName_1 + ":16:15"), (exists) => OT.addAttribute('exists', exists), fileName_1 + ":17:10")));
};
export const symlinkExists = (pathLike) => {
    return (T.catchTag_(T.map_(stat(pathLike), (stat_) => stat_.isSymbolicLink(), fileName_1 + ":25:10"), 'node.fs.FileNotFoundError', () => T.succeed(false, fileName_1 + ":26:60"), fileName_1 + ":26:15"));
};
export const stat = (filePath) => {
    return T.tryCatchPromise(async () => fs.stat(filePath), (error) => {
        if (error.code === 'ENOENT') {
            return new FileNotFoundError({ filePath });
        }
        else {
            return new StatError({ filePath, error });
        }
    }, fileName_1 + ":31:27");
};
export const readFile = (filePath) => OT.withSpan('readFile', { attributes: { filePath } })(T.tryCatchPromise(() => fs.readFile(filePath, 'utf8'), (error) => {
    if (error.code === 'ENOENT') {
        return new FileNotFoundError({ filePath });
    }
    else {
        return new ReadFileError({ filePath, error });
    }
}, fileName_1 + ":45:22"));
export const readFileBuffer = (filePath) => OT.withSpan('readFileBuffer', { attributes: { filePath } })(T.tryCatchPromise(() => fs.readFile(filePath), (error) => {
    if (error.code === 'ENOENT') {
        return new FileNotFoundError({ filePath });
    }
    else {
        return new ReadFileError({ filePath, error });
    }
}, fileName_1 + ":59:22"));
export const readFileJson = (filePath) => (T.chain_(readFile(filePath), (str) => T.tryCatch(() => JSON.parse(str), (error) => new JsonParseError({ str, error }), fileName_1 + ":77:17"), fileName_1 + ":76:12"));
export const readFileJsonIfExists = (filePath) => (T.catchTag_(T.chain_(fileOrDirExists(filePath), (exists) => (exists ? readFileJson(filePath) : T.succeed(undefined, fileName_1 + ":89:72")), fileName_1 + ":89:12"), 'node.fs.FileNotFoundError', (e) => T.die(e, fileName_1 + ":90:57"), fileName_1 + ":90:15"));
export const writeFile = (filePath, content) => OT.withSpan('writeFile', { attributes: { filePath } })(T.tryCatchPromise(() => fs.writeFile(filePath, content, 'utf8'), (error) => new WriteFileError({ filePath, error }), fileName_1 + ":95:22"));
export const writeFileJson = ({ filePath, content, }) => (T.chain_(T.tryCatch(() => JSON.stringify(content, null, 2) + '\n', (error) => new JsonStringifyError({ error }), fileName_1 + ":109:15"), (contentStr) => writeFile(filePath, contentStr), fileName_1 + ":113:12"));
export const mkdirp = (dirPath) => OT.withSpan('mkdirp', { attributes: { dirPath } })(T.tryCatchPromise(() => fs.mkdir(dirPath, { recursive: true }), (error) => new MkdirError({ dirPath, error }), fileName_1 + ":118:22"));
export function rm(path, params = {}) {
    const { force = false, recursive = true } = params;
    return OT.withSpan('rm', { attributes: { path } })(T.tryCatchPromise(() => fs.rm(path, { recursive, force }), (error) => {
        if (error.code === 'ENOENT') {
            return new FileOrDirNotFoundError({ path });
        }
        else {
            return new RmError({ path, error });
        }
    }, fileName_1 + ":136:22"));
}
/**
 * NOTE: symlinks are not supported widely on Windows
 */
export const symlink = ({ targetPath, symlinkPath, type, }) => OT.withSpan('symlink', { attributes: { targetPath, symlinkPath, type } })(T.tryCatchPromise(() => fs.symlink(targetPath, symlinkPath, type), (error) => new SymlinkError({ targetPath, symlinkPath, type, error }), fileName_1 + ":164:22"));
export class FileNotFoundError extends Tagged('node.fs.FileNotFoundError') {
}
export class FileOrDirNotFoundError extends Tagged('node.fs.FileOrDirNotFoundError') {
}
export class ReadFileError extends Tagged('node.fs.ReadFileError') {
}
export class StatError extends Tagged('node.fs.StatError') {
}
export class WriteFileError extends Tagged('node.fs.WriteFileError') {
}
export class MkdirError extends Tagged('node.fs.MkdirError') {
}
export class RmError extends Tagged('node.fs.RmError') {
}
export class SymlinkError extends Tagged('node.fs.SymlinkError') {
}
export class UnknownFSError extends Tagged('node.fs.UnknownFSError') {
    constructor() {
        super(...arguments);
        this.toString = () => `UnknownFSError: ${errorToString(this.error)} ${this.error.stack}`;
    }
}
export class JsonParseError extends Tagged('node.fs.JsonParseError') {
}
export class JsonStringifyError extends Tagged('node.fs.JsonStringifyError') {
}
//# sourceMappingURL=fs.js.map