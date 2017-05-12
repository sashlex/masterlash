'use strict';

const path = require( 'path' );
const gulp = require( 'gulp' );
const exec = require( 'child_process' ).exec;
const WWW_DIR = path.normalize( `${ __dirname }/www` );
const VIEWS_DIR = path.normalize( `${ WWW_DIR }/views` );
const DIST_DIR = path.normalize( `${ __dirname }/dist` );

/* compile typescript */
gulp.task( 'tsc', next =>
           exec( `tsc -p ./tsconfig.json --outDir ${ DIST_DIR }`, ( error, stdout, stderr ) => {
              stdout && console.log( stdout );
              stderr && console.log( stderr );
              return next( error );
           })
         );

/* copy files */
gulp.task( 'copy', next =>
           gulp.src( [
              `${ VIEWS_DIR }/**/*`,
              `${ WWW_DIR }/package.json`
           ], { base: WWW_DIR } )
           .pipe( gulp.dest( DIST_DIR ) )
         );

/* install in dist */
gulp.task( 'install', next =>
           exec( `cd ${ DIST_DIR } && yarn install`, ( error, stdout, stderr ) => {
              stdout && console.log( stdout );
              stderr && console.log( stderr );
              return next( error );
           })
         );

/* build all */
gulp.task( 'default', [ 'copy', 'tsc', 'install' ] );
