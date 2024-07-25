const fs = require('fs',);
const path = require('path',);
const fontFaceGen = require('fontfacegen',);

const SRC_DIR = path.join(__dirname, 'fontfacegen',);
const DIST_DIR = path.join(__dirname, 'src', 'assets', 'fonts',);
const fonts  = fs.readdirSync(SRC_DIR,);


for (font of fonts) {
  const extension = path.extname(font,);

  if (extension == '.ttf' || extension == '.otf') {
    fontFaceGen({
      source: path.join(SRC_DIR, font,),
      dest: DIST_DIR,
      css_fontpath: '@fonts/',
      embed: ['ttf',],
      subset: 'abcdef',
    },);
  }
};




