export declare type Document = Record<string, any> & DocumentMeta;
export declare type NestedDocument = Record<string, any> & Omit<DocumentMeta, '_id'>;
export declare type DocumentMeta = {
    /**
     * Either coming from API-based CMS or based on the local file path
     * Optional concept as no system/workflow depends on IDs.
     */
    _id: string;
    _raw: RawDocumentData;
};
export declare type RawDocumentData = Record<string, any>;
export declare type Markdown = {
    /** Raw Markdown source */
    raw: string;
    /** Generated HTML based on Markdown source */
    html: string;
};
export declare type MDX = {
    /** Raw MDX source */
    raw: string;
    /** Prebundled via mdx-bundler */
    code: string;
};
//# sourceMappingURL=data-types.d.ts.map