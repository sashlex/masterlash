'use strict';

import * as path from 'path';
const rootDir = path.normalize( `${ __dirname }/../` );
const viewsDir = path.normalize( `${ rootDir }/views` );
const publicDir = path.normalize( `${ rootDir }/public` );
const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const configs : any = {

   NODE_ENV: nodeEnv,
   LOG: nodeEnv !== 'production',
   PORT: 3100,

   ROOT_DIR: rootDir,
   VIEWS_DIR: viewsDir,
   PUBLIC_DIR: publicDir,

   /* logger options */
   LOGGER_CONSOLE_OPTIONS: {
      level: 'silly',
      timestamp: true,
      colorize: true
   },
   LOGGER_FILE_OPTIONS: {
      level: 'silly',
      filename: 'log/access.log',
      maxsize: 102400,
      maxFiles: 12,
      tailable: true
   },

   /* template engine config */
   PUG_OPTIONS: {
      basedir: viewsDir
   },

   /* js-beautify options */
   JS_BEAUTIFY_OPTIONS: {
      indent_size: 3,
      indent_char: ' ',
   }
};

export default configs;
