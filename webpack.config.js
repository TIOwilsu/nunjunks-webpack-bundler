const path = require('path',);
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin',);
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
    extensions: ['.js', '.ts',],
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
        test: /\.(png|jpe?g|svg|webp|ico)$/i,
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
  plugins: [
    new HtmlBundlerPlugin({
      entry: [
        {
          import: path.join(PAGES_DIR, 'home', 'home.html',),
          filename: 'index.html',
          data: { title: 'Home page', page: 'home', },
        },
        {
          import: path.join(PAGES_DIR, 'login', 'login.html',),
          filename: 'login.html',
          data: { title: 'Login page', page: 'login', },
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
  ],
};

module.exports = (env,) => {
  if (isServer(env.command,)) {
    config.devServer.static = DIST_DIR;
  }

  return config;
};
