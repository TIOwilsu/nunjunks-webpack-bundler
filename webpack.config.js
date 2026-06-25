const path = require('path',);
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin',);
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin',);
const GenerateWebpPlugin = require('./webpack-plugins/generate-webp.plugin.js',);

const {
  SCRIPTS_DIR,
  ASSETS_DIR,
  VIEWS_DIR,
  LAYOUTS_DIR,
  PAGES_DIR,
  FONTS_DIR,
  STYLES_DIR,
  IMAGES_DIR,
  PARTIALS_DIR,
  DIST_DIR,
  isServer,
} = require('./webpack.helpers.js',);

const config = {
  resolve: {
    extensions: ['.js',],
    alias: {
      '@assets': ASSETS_DIR,
      '@scripts': SCRIPTS_DIR,
      '@styles': STYLES_DIR,
      '@images': IMAGES_DIR,
      '@fonts': FONTS_DIR,
      '@views': VIEWS_DIR,
      '@layouts': LAYOUTS_DIR,
      '@pages': PAGES_DIR,
      '@partials': PARTIALS_DIR,
    },
  },
  output: {
    path: DIST_DIR,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { quietDeps: true, },
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        include: FONTS_DIR,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|svg|webp|ico)$/i,
        exclude: FONTS_DIR,
        oneOf: [
          {
            resourceQuery: /inline/,
            type: 'asset/inline',
          },
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10,
              },
            },
            generator: {
              filename: 'assets/images/[name].[hash:8][ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.(mov|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/videos/[name][ext]',
        },
      },
    ],
  },
  devServer: {
    open: true,
    compress: true,
    watchFiles: {
      paths: [PARTIALS_DIR, PAGES_DIR, LAYOUTS_DIR, STYLES_DIR, SCRIPTS_DIR,],
      options: {
        usePolling: true,
      },
    },
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true, },],
              ['mozjpeg', { quality: 75, progressive: true, },],
              ['pngquant', { quality: [0.65, 0.85,], speed: 3, },],
              ['svgo', {},],
            ],
          },
        },
      },),
      new ImageMinimizerPlugin({
        test: /\.webp$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              webp: {
                quality: 70,
              },
            },
          },
        },
      },),
    ],
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: [
        {
          import: path.join(PAGES_DIR, 'home', 'home.html',),
          filename: 'index.html',
          data: { title: 'Home page', page: 'home', },
        },
      ],
      js: {
        filename: 'assets/scripts/[name].[contenthash:8].js',
      },
      css: {
        filename: 'assets/styles/[name].[contenthash:8].css',
      },
      preprocessor: 'nunjucks',
      loaderOptions: {
        clean: true,
        sources: [
          {
            tag: 'div',
            attributes: ['style',],
          },
          {
            tag: 'article',
            attributes: ['style',],
          },
        ],
      },
      minify: 'auto',
      minifyOptions: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
    },),
    new GenerateWebpPlugin(),
  ],
};

module.exports = (env,) => {
  if (isServer(env.command,)) {
    config.devServer.static = DIST_DIR;
  }

  return config;
};
