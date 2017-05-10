'use strict';

const path = require( 'path' );
const rootDir = path.normalize( `${__dirname}/../` );
const viewsDir = path.normalize( `${rootDir}/views` );
const nodeEnv = process.argv[ 1 ] ? process.argv[ 2 ] : 'development';

const configs = {

   NODE_ENV: nodeEnv === 'production' ? 'production' : 'development',
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
   }
};

module.exports = configs;
