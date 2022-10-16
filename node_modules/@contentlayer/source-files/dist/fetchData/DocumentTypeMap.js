import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/DocumentTypeMap.ts";
import { HashMap, O, pipe, State, T, Tagged } from '@contentlayer/utils/effect';
export class DocumentTypeMap extends Tagged('@local/DocumentTypeMap') {
    constructor() {
        super(...arguments);
        this.add = (documentTypeName, filePath) => {
            const oldPaths = (O.getOrElse_(HashMap.get_(this.map, documentTypeName), () => []));
            return new DocumentTypeMap({
                map: HashMap.set_(this.map, documentTypeName, [...oldPaths, filePath]),
            });
        };
        this.getFilePaths = (documentTypeName) => HashMap.get_(this.map, documentTypeName);
    }
}
DocumentTypeMap.init = () => new DocumentTypeMap({ map: HashMap.make() });
/**
 * This state is needed for certain kinds of error handling (e.g. to check if singleton documents have been provided)
 */
export const DocumentTypeMapState = State.State(DocumentTypeMap._tag);
export const provideDocumentTypeMapState = T.provideSomeLayer(DocumentTypeMapState.Live(DocumentTypeMap.init()));
//# sourceMappingURL=DocumentTypeMap.js.map