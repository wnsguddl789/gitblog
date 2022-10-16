import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/field-date.ts";
import { Temporal } from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
export const makeDateField = ({ dateString, fieldName, options, documentFilePath, documentTypeDef, }) => T.tryCatch(() => {
    const dateHasExplitcitTimezone = () => {
        try {
            Temporal.TimeZone.from(dateString);
            return true;
        }
        catch {
            return false;
        }
    };
    // See Temporal docs https://tc39.es/proposal-temporal/docs/
    if (options.date?.timezone && !dateHasExplitcitTimezone()) {
        const desiredTimezone = Temporal.TimeZone.from(options.date.timezone);
        const offsetNs = desiredTimezone.getOffsetNanosecondsFor(Temporal.Now.instant());
        return new Date(dateString).toTemporalInstant().subtract({ nanoseconds: offsetNs }).toString();
    }
    else {
        return new Date(dateString).toISOString();
    }
}, () => new FetchDataError.IncompatibleFieldDataError({
    documentFilePath,
    documentTypeDef,
    incompatibleFieldData: [[fieldName, dateString]],
}), fileName_1 + ":21:13");
//# sourceMappingURL=field-date.js.map