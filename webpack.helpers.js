const path = require('path',);

// Source and dist directories
const DIR = path.dirname(__dirname,);
const SOURCE_DIR = path.join(__dirname, 'src',);
const DIST_DIR = path.join(__dirname, 'dist',);

// Views directories
const VIEWS_DIR = path.join(SOURCE_DIR, 'views',);
const LAYOUTS_DIR = path.join(VIEWS_DIR, 'layouts',);
const PAGES_DIR = path.join(VIEWS_DIR, 'pages',);
const PARTIALS_DIR = path.join(VIEWS_DIR, 'partials',);

// Assets directories
const ASSETS_DIR = path.join(SOURCE_DIR, 'assets',);
const STYLES_DIR = path.join(ASSETS_DIR, 'styles',);
const SCRIPTS_DIR = path.join(ASSETS_DIR, 'scripts',);
const IMAGES_DIR = path.join(ASSETS_DIR, 'images',);
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts',);

// Mode
const isDevelopment = (mode,) => mode === 'development';
const isProduction = (mode,) => mode === 'production';

// Env
const isServer = (command,) => command === 'server';

module.exports = {
  DIR,
  SOURCE_DIR,
  DIST_DIR,
  VIEWS_DIR,
  LAYOUTS_DIR,
  PAGES_DIR,
  PARTIALS_DIR,
  ASSETS_DIR,
  STYLES_DIR,
  SCRIPTS_DIR,
  FONTS_DIR,
  IMAGES_DIR,
  isDevelopment,
  isProduction,
  isServer,
};
