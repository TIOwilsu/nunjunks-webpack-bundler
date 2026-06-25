const path = require('path',);
const fs = require('fs/promises',);
const { existsSync, } = require('fs',);
const sharp = require('sharp',);
const {
  DIST_DIR,
} = require('../webpack.helpers.js',);

const RASTER_IMAGE_PATTERN = /\.(png|jpe?g)$/i;
const URL_RASTER_IMAGE_PATTERN = /\.(png|jpe?g)(\?.*)?$/i;

const collectRasterFiles = async (directory,) => {
  const entries = await fs.readdir(directory, { withFileTypes: true, },);
  const nestedFiles = await Promise.all(
    entries.map(async (entry,) => {
      const fullPath = path.join(directory, entry.name,);

      if (entry.isDirectory()) {
        return collectRasterFiles(fullPath,);
      }

      if (RASTER_IMAGE_PATTERN.test(entry.name,)) {
        return [fullPath,];
      }

      return [];
    },),
  );

  return nestedFiles.flat();
};

const collectHtmlFiles = async (directory,) => {
  const entries = await fs.readdir(directory, { withFileTypes: true, },);
  const nestedFiles = await Promise.all(
    entries.map(async (entry,) => {
      const fullPath = path.join(directory, entry.name,);

      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath,);
      }

      if (/\.html$/i.test(entry.name,)) {
        return [fullPath,];
      }

      return [];
    },),
  );

  return nestedFiles.flat();
};

const normalizeToWebPath = (absoluteFilePath,) =>
  path.relative(DIST_DIR, absoluteFilePath,).split(path.sep,).join('/',);

const makeLazyStyle = (styleValue,) =>
  styleValue.
    replace(/\s*,\s*url\([^)]*\)/i, '').
    replace(/url\([^)]*\)/i, 'none');

const injectLazyAttributes = (html, availableWebpPaths,) =>
  html.replace(
    /<([a-z]+)([^>]*\bclass=(["'])[^"']*\bjs-lazy-bg\b[^"']*\3[^>]*)>/gi,
    (fullTag, tagName, attributes,) => {
      const styleMatch = attributes.match(/\sstyle=(["'])(.*?)\1/i,);

      if (!styleMatch) {
        return fullTag;
      }

      const styleQuote = styleMatch[1];
      const styleValue = styleMatch[2];
      const urlMatch = styleValue.match(/url\((["'])?([^"')]+)\1\)/i,);

      if (!urlMatch) {
        return fullTag;
      }

      const sourceUrl = urlMatch[2];
      const webpUrl = sourceUrl.replace(URL_RASTER_IMAGE_PATTERN, '.webp$2',);
      const normalizedWebpPath = webpUrl.split('?',)[0];

      if (!availableWebpPaths.has(normalizedWebpPath,)) {
        return fullTag;
      }

      let updatedAttributes = attributes.replace(
        /\sstyle=(["'])(.*?)\1/i,
        ` style=${styleQuote}${makeLazyStyle(styleValue,)}${styleQuote}`,
      );

      if (!/\sdata-bg-src=/.test(updatedAttributes,)) {
        updatedAttributes += ` data-bg-src="${sourceUrl}"`;
      }

      if (!/\sdata-bg-webp=/.test(updatedAttributes,)) {
        updatedAttributes += ` data-bg-webp="${webpUrl}"`;
      }

      return `<${tagName}${updatedAttributes}>`;
    },
  );

module.exports = class GenerateWebpPlugin {
  apply (compiler,) {
    compiler.hooks.afterEmit.tapPromise('GenerateWebpPlugin', async () => {
      const distImagesDir = path.join(DIST_DIR, 'assets', 'images',);

      if (!existsSync(distImagesDir,)) {
        return;
      }

      const sourceFiles = await collectRasterFiles(distImagesDir,);
      const generatedWebpFiles = [];

      await Promise.all(
        sourceFiles.map(async (sourceFile,) => {
          const outputFile = sourceFile.replace(RASTER_IMAGE_PATTERN, '.webp',);

          await fs.mkdir(path.dirname(outputFile,), { recursive: true, },);
          await sharp(sourceFile,).webp({ quality: 70, }).toFile(outputFile,);
          generatedWebpFiles.push(outputFile,);
        },),
      );

      const availableWebpPaths = new Set(
        generatedWebpFiles.map((filePath,) => normalizeToWebPath(filePath,),),
      );
      const htmlFiles = await collectHtmlFiles(DIST_DIR,);

      await Promise.all(
        htmlFiles.map(async (htmlFile,) => {
          const htmlContent = await fs.readFile(htmlFile, 'utf8',);
          const transformedHtml = injectLazyAttributes(htmlContent, availableWebpPaths,);

          if (transformedHtml !== htmlContent) {
            await fs.writeFile(htmlFile, transformedHtml, 'utf8',);
          }
        },),
      );
    },);
  }
}
