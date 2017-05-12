'use strict';

const path = require( 'path' );
const rootDir = path.normalize( `${__dirname}/../` );
const viewsDir = path.normalize( `${rootDir}/views` );
const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const configs = {

   NODE_ENV: nodeEnv,
   LOG: nodeEnv !== 'production',
   PORT: 3000,

   ROOT_DIR: rootDir,
   VIEWS_DIR: viewsDir,

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
   }
};

module.exports = configs;
