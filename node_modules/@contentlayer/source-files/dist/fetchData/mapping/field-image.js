import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/fetchData/mapping/field-image.ts";
import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { unknownToRelativePosixFilePath } from '@contentlayer/utils';
import { identity, OT, pipe, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { FetchDataError } from '../../errors/index.js';
import { getFromDocumentContext } from '../DocumentContext.js';
export const makeImageField = ({ imageData, documentFilePath, contentDirPath, fieldDef, }) => T.gen(function* ($) {
    const imageFieldData = yield* $(getImageFieldData({
        imagePath: imageData.src,
        documentFilePath,
        contentDirPath,
        fieldDef,
    }), fileName_1 + ":26:36");
    return { ...imageFieldData, alt: imageData.alt };
}, fileName_1 + ":25:8");
const getImageFieldData = ({ documentFilePath, contentDirPath, fieldDef, imagePath: imagePath_, }) => (OT.withSpan('getImageFieldData', { attributes: { imagePath: imagePath_ } })(T.catchAll_(T.gen(function* ($) {
    const cwd = yield* $(core.getCwd, fileName_1 + ":51:27");
    const imagePath = unknownToRelativePosixFilePath(imagePath_, cwd);
    const documentDirPath = utils.dirname(documentFilePath);
    const filePath = utils.filePathJoin(documentDirPath, imagePath);
    const absoluteFilePath = utils.filePathJoin(contentDirPath, documentDirPath, imagePath);
    const relativeFilePath = utils.relative(utils.filePathJoin(contentDirPath, documentDirPath), absoluteFilePath);
    const fileBuffer = yield* $(fs.readFileBuffer(absoluteFilePath), fileName_1 + ":59:34");
    const { resizedData, height, width, format } = yield* $(processImage(fileBuffer), fileName_1 + ":61:62");
    const dataB64 = utils.base64.encode(resizedData);
    const blurhashDataUrl = `data:image/${format};base64,${dataB64}`;
    return {
        filePath,
        relativeFilePath,
        format,
        height,
        width,
        blurhashDataUrl,
    };
}, fileName_1 + ":50:10"), (error) => (T.chain_(getFromDocumentContext('documentTypeDef'), (documentTypeDef) => T.fail(new FetchDataError.ImageError({
    error,
    documentFilePath,
    fieldDef,
    imagePath: imagePath_,
    documentTypeDef,
}), fileName_1 + ":79:17"), fileName_1 + ":78:16")), fileName_1 + ":75:15")));
let SharpModule = undefined;
let ImageScriptModule = undefined;
/**
 * This function tries to use `sharp` to process the image as sharp runs natively on Node.js but only if the user
 * has `sharp` installed. Contentlayer doesn't depend on `sharp` directly as it's rather slow to install.
 * As a fallback Contentlayer uses `imagescript` to process the image.
 */
const processImage = (fileBuffer) => T.gen(function* ($) {
    if (SharpModule === undefined && ImageScriptModule === undefined) {
        yield* $((OT.withSpan('importSharpOrImageScript')(T.catchAll_(
        // NOTE `sharp` is still a CJS module, so default import is needed
        T.tap_(T.tryPromise(() => import('sharp'), fileName_1 + ":107:23"), (_) => T.succeedWith(() => (SharpModule = _.default), fileName_1 + ":109:37"), fileName_1 + ":109:16"), () => (T.tap_(T.tryPromise(() => import('imagescript'), fileName_1 + ":112:27"), (_) => T.succeedWith(() => (ImageScriptModule = _), fileName_1 + ":113:41"), fileName_1 + ":113:20")), fileName_1 + ":110:21"))), fileName_1 + ":105:15");
    }
    if (SharpModule) {
        return yield* $(processImageWithSharp(fileBuffer), fileName_1 + ":122:22");
    }
    else {
        return yield* $(processImageWithImageScript(fileBuffer), fileName_1 + ":124:22");
    }
}, fileName_1 + ":103:8");
const processImageWithImageScript = (fileBuffer) => (OT.withSpan('processImageWithImageScript')(T.gen(function* ($) {
    const format = ImageScriptModule.ImageType.getType(fileBuffer);
    if (format === null) {
        return yield* $(T.fail(new Error('Could not determine image type'), fileName_1 + ":133:31"), fileName_1 + ":133:24");
    }
    const image = yield* $((OT.withSpan('decodeImage')(T.tryPromise(() => ImageScriptModule.decode(fileBuffer), fileName_1 + ":138:23"))), fileName_1 + ":136:29");
    const { width, height } = image;
    image.resize(8, 8);
    const resizedData = yield* $((OT.withSpan('resizeImage')(T.tryPromise(() => image.encode(70), fileName_1 + ":148:23"))), fileName_1 + ":146:35");
    return { resizedData, width, height, format };
}, fileName_1 + ":130:10")));
const processImageWithSharp = (fileBuffer) => (OT.withSpan('processImageWithSharp')(T.gen(function* ($) {
    const sharpImage = SharpModule(fileBuffer);
    const metadata = yield* $(T.tryPromise(() => sharpImage.metadata(), fileName_1 + ":163:45"), fileName_1 + ":163:32");
    if (metadata.width === undefined || metadata.height === undefined || metadata.format === undefined) {
        return yield* $(T.fail(new Error('Could not determine image dimensions'), fileName_1 + ":166:31"), fileName_1 + ":166:24");
    }
    const { width, height, format } = metadata;
    const resizedInfo = yield* $((OT.withSpan('resizeImage', { attributes: { width, height, format } })(T.tryPromise(() => {
        const quality = 70;
        switch (format) {
            case 'jpeg':
                sharpImage.jpeg({ quality });
                break;
            case 'webp':
                sharpImage.webp({ quality });
                break;
            case 'png':
                sharpImage.png({ quality });
                break;
            case 'avif':
                sharpImage.avif({ quality });
                break;
        }
        return sharpImage.resize(8, 8).toBuffer({ resolveWithObject: true });
    }, fileName_1 + ":173:23"))), fileName_1 + ":171:35");
    return { resizedData: resizedInfo.data, width, height, format };
}, fileName_1 + ":160:10")));
//# sourceMappingURL=field-image.js.map