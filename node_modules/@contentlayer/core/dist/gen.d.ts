import type { Document, NestedDocument } from './data-types.js';
import type { DataCache } from './DataCache.js';
export declare type GetDocumentTypeMapGen<TDocument extends Document> = ContentlayerGen extends {
    documentTypeMap: infer T;
} ? T : Record<string, TDocument>;
export declare type GetDocumentTypeGen<Name extends string, TDocument extends Document> = Name extends keyof GetDocumentTypeMapGen<TDocument> ? GetDocumentTypeMapGen<TDocument>[Name] : Document;
export declare type GetDocumentTypesGen = ContentlayerGen extends {
    documentTypes: infer T;
} ? T : Document;
export declare type GetDocumentTypeNamesGen = ContentlayerGen extends {
    documentTypeNames: infer T;
} ? T : string;
export declare type GetNestedTypeMapGen = ContentlayerGen extends {
    objectTypeMap: infer T;
} ? T : Record<string, NestedDocument>;
export declare type GetNestedTypeGen<Name extends string> = Name extends keyof GetNestedTypeMapGen ? GetNestedTypeMapGen[Name] : NestedDocument;
export declare type GetNestedTypesGen = ContentlayerGen extends {
    objectTypes: infer T;
} ? T : NestedDocument;
export declare type GetNestedTypeNamesGen = ContentlayerGen extends {
    objectTypeNames: infer T;
} ? T : string;
export declare type GetAllTypeNamesGen = ContentlayerGen extends {
    allTypeNames: infer T;
} ? T : string;
export declare type GetFieldNamesForDefinitionGen<DefName extends string> = DefName extends keyof GetDocumentTypeMapGen<Document> ? keyof GetDocumentTypeGen<DefName, Document> : keyof GetNestedTypeGen<DefName>;
declare global {
    interface ContentlayerGen {
    }
}
export declare type CacheGen = Omit<DataCache.Cache, 'documents'> & {
    documents: DocumentGen[];
};
export declare type DocumentGen = GetDocumentTypesGen;
//# sourceMappingURL=gen.d.ts.map