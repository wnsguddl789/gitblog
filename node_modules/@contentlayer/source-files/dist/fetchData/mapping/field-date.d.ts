import type * as core from '@contentlayer/core';
import type { RelativePosixFilePath } from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
export declare const makeDateField: ({ dateString, fieldName, options, documentFilePath, documentTypeDef, }: {
    dateString: string;
    fieldName: string;
    options: core.PluginOptions;
    documentFilePath: RelativePosixFilePath;
    documentTypeDef: core.DocumentTypeDef;
}) => T.IO<FetchDataError.IncompatibleFieldDataError, string>;
//# sourceMappingURL=field-date.d.ts.map