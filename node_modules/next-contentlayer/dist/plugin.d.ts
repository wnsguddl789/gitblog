import '@contentlayer/utils/effect/Tracing/Enable';
export declare type NextPluginOptions = {
    configPath?: string | undefined;
};
export declare const runContentlayerDev: ({ configPath }: NextPluginOptions) => Promise<void>;
export declare const runContentlayerBuild: ({ configPath }: NextPluginOptions) => Promise<void>;
//# sourceMappingURL=plugin.d.ts.map