'use strict';

const path = require( 'path' );
const gulp = require( 'gulp' );
const exec = require( 'child_process' ).exec;
const spawn = require( 'child_process' ).spawn;
const WWW_DIR = path.normalize( `${ __dirname }/www` );
const VIEWS_DIR = path.normalize( `${ WWW_DIR }/views` );
const DIST_DIR = path.normalize( `${ __dirname }/dist` );

/* copy files */
gulp.task( 'copy', () => gulp.src( [
   `${ VIEWS_DIR }/**/*`,
   `${ WWW_DIR }/package.json`
], { base: WWW_DIR } ).pipe( gulp.dest( DIST_DIR ) ) );

/* compile typescript */
gulp.task( 'tsc', next => {
   exec( `tsc -p ./tsconfig.json --outDir ${ DIST_DIR }`, ( error, stdout, stderr ) => {
      stdout && console.log( stdout );
      stderr && console.log( stderr );
      if( error ) return next( error );
      else return next();
   });
});

/* install in dist */
gulp.task( 'install', next =>
           exec( `cd ${ DIST_DIR } && yarn install`, ( error, stdout, stderr ) => {
              stdout && console.log( stdout );
              stderr && console.log( stderr );
              return next( error );
           })
         );

/* watch changes */
gulp.task( 'watch', gulp.series( 'copy', 'install', function watch( next ) {
   try {
      let tsc = spawn( 'tsc', [ '-w', '-p', './tsconfig.json', '--outDir', `${ DIST_DIR }` ] );
      tsc.stdout.on( 'data', data => console.log(`${ data }`) );
      tsc.stderr.on( 'data', error => { throw error; } );
      tsc.on( 'close', code => console.log( `${ code }`) );
   } catch( error ) {
      return next( error );
   };
   return undefined;
}));

/* build all */
gulp.task( 'default', gulp.series( 'copy', 'tsc', 'install' ) );
