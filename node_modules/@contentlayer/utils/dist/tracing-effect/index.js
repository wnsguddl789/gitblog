import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/tracing-effect/index.ts";
import * as T from '@effect-ts/core/Effect';
import * as OT from '@effect-ts/otel';
import { LiveSimpleProcessor, makeOTLPTraceExporterConfigLayer } from '@effect-ts/otel-exporter-trace-otlp-grpc';
import * as OTNode from '@effect-ts/otel-sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
//
// Jaeger Tracer (via Grpc Collector)
//
const makeNodeTracingProvider = (serviceName) => OTNode.NodeProvider({
    resource: new Resource({ [SemanticResourceAttributes.SERVICE_NAME]: serviceName }),
});
const CollectorConfig = makeOTLPTraceExporterConfigLayer({});
const makeJaegerNodeTracingLayer = (serviceName) => CollectorConfig['>+>'](OT.LiveTracer['<<<'](makeNodeTracingProvider(serviceName)['>+>'](LiveSimpleProcessor)));
export const provideJaegerTracing = (serviceName) => T.provideSomeLayer(makeJaegerNodeTracingLayer(serviceName));
// Only use Otel tracing if explicitly enabled via env var
export const provideTracing = (tracingServiceName) => process.env.CL_OTEL !== undefined ? provideJaegerTracing(tracingServiceName) : provideDummyTracing;
//
// Dummy Tracer
//
// TODO change CLI entrypoints so this isn't needed
const dummyProps = {};
export const DummyTracing = OT.Tracer.has({
    [OT.TracerSymbol]: OT.TracerSymbol,
    tracer: {
        startSpan: () => ({
            setAttribute: () => null,
            setStatus: () => null,
            end: () => null,
        }),
        ...dummyProps,
    },
});
export const provideDummyTracing = T.provide(DummyTracing, fileName_1 + ":49:45");
//# sourceMappingURL=index.js.map