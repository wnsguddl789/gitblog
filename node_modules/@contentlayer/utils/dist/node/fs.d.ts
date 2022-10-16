/// <reference types="node" />
import type { Stats } from 'node:fs';
import * as OT from '@effect-ts/otel';
import type { JsonValue } from 'type-fest';
import { T } from '../effect/index.js';
export declare const fileOrDirExists: (pathLike: string) => T.Effect<OT.HasTracer, StatError, boolean>;
export declare const symlinkExists: (pathLike: string) => T.Effect<unknown, StatError, boolean>;
export declare const stat: (filePath: string) => T.Effect<unknown, FileNotFoundError | StatError, Stats>;
export declare const readFile: (filePath: string) => T.Effect<OT.HasTracer, ReadFileError | FileNotFoundError, string>;
export declare const readFileBuffer: (filePath: string) => T.Effect<OT.HasTracer, ReadFileError | FileNotFoundError, Buffer>;
export declare const readFileJson: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer, FileNotFoundError | ReadFileError | JsonParseError, T>;
export declare const readFileJsonIfExists: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer, StatError | ReadFileError | JsonParseError, T | undefined>;
export declare const writeFile: (filePath: string, content: string) => T.Effect<OT.HasTracer, WriteFileError, void>;
export declare const writeFileJson: ({ filePath, content, }: {
    filePath: string;
    content: JsonValue;
}) => T.Effect<OT.HasTracer, WriteFileError | JsonStringifyError, void>;
export declare const mkdirp: <T extends string>(dirPath: T) => T.Effect<OT.HasTracer, MkdirError, void>;
export declare function rm(path: string, params: {
    force: true;
    recursive?: boolean;
}): T.Effect<OT.HasTracer, RmError, void>;
export declare function rm(path: string, params?: {
    force?: false;
    recursive?: boolean;
}): T.Effect<OT.HasTracer, RmError | FileOrDirNotFoundError, void>;
export declare type SymlinkType = 'file' | 'dir' | 'junction';
/**
 * NOTE: symlinks are not supported widely on Windows
 */
export declare const symlink: ({ targetPath, symlinkPath, type, }: {
    targetPath: string;
    symlinkPath: string;
    type: SymlinkType;
}) => T.Effect<OT.HasTracer, SymlinkError, void>;
declare const FileNotFoundError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.FileNotFoundError", "_tag">;
export declare class FileNotFoundError extends FileNotFoundError_base<{
    readonly filePath: string;
}> {
}
declare const FileOrDirNotFoundError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.FileOrDirNotFoundError", "_tag">;
export declare class FileOrDirNotFoundError extends FileOrDirNotFoundError_base<{
    readonly path: string;
}> {
}
declare const ReadFileError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.ReadFileError", "_tag">;
export declare class ReadFileError extends ReadFileError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const StatError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.StatError", "_tag">;
export declare class StatError extends StatError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const WriteFileError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.WriteFileError", "_tag">;
export declare class WriteFileError extends WriteFileError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const MkdirError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.MkdirError", "_tag">;
export declare class MkdirError extends MkdirError_base<{
    readonly dirPath: string;
    readonly error: unknown;
}> {
}
declare const RmError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.RmError", "_tag">;
export declare class RmError extends RmError_base<{
    readonly path: string;
    readonly error: unknown;
}> {
}
declare const SymlinkError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.SymlinkError", "_tag">;
export declare class SymlinkError extends SymlinkError_base<{
    readonly targetPath: string;
    readonly symlinkPath: string;
    readonly type: SymlinkType;
    readonly error: unknown;
}> {
}
declare const UnknownFSError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.UnknownFSError", "_tag">;
export declare class UnknownFSError extends UnknownFSError_base<{
    readonly error: any;
}> {
    toString: () => string;
}
declare const JsonParseError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.JsonParseError", "_tag">;
export declare class JsonParseError extends JsonParseError_base<{
    readonly str: string;
    readonly error: unknown;
}> {
}
declare const JsonStringifyError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"node.fs.JsonStringifyError", "_tag">;
export declare class JsonStringifyError extends JsonStringifyError_base<{
    readonly error: unknown;
}> {
}
export {};
//# sourceMappingURL=fs.d.ts.map