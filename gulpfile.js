'use strict';

const path = require( 'path' );
const gulp = require( 'gulp' );
const exec = require( 'child_process' ).exec;
const spawn = require( 'child_process' ).spawn;
const WWW_DIR = path.normalize( `${ __dirname }/www` );
const VIEWS_DIR = path.normalize( `${ WWW_DIR }/views` );
const PUBLIC_DIR = path.normalize( `${ WWW_DIR }/public` );
const DIST_DIR = path.normalize( `${ __dirname }/dist` );

/* START secondary tasks */
/* copy files */
gulp.task( 'copy', () => gulp.src( [
   `${ VIEWS_DIR }/**/*`, // copy into DIST_DIR
   `${ PUBLIC_DIR }/**/*`, // copy into DIST_DIR
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

/* watch assets */
gulp.task( 'watch-assets', () => {

   /* copy on change */
   let copyAssets;
   return gulp.watch( [ `${ VIEWS_DIR }/**/*`, `${ PUBLIC_DIR }/**/*` ], gulp.series( copyAssets = () => {
      return gulp.src( [
         `${ VIEWS_DIR }/**/*`, // copy into DIST_DIR
         `${ PUBLIC_DIR }/**/*`
      ], { base: WWW_DIR } )
         .pipe( gulp.dest( DIST_DIR ) );
   }));
});
/* END */

/* START primary tasks */
/* build all */
gulp.task( 'default', gulp.series( 'copy', 'tsc', 'install' ) );

/* watch changes ( assets, typescripts ) */
gulp.task( 'watch', gulp.series( 'copy', 'install', gulp.parallel( 'watch-assets', function watch( next ) { // run watchers parallel, to avoid watcher missing
   try {
      let tsc = spawn( 'tsc', [ '-w', '-p', './tsconfig.json', '--outDir', `${ DIST_DIR }` ] );
      tsc.stdout.on( 'data', data => console.log(`${ data }`) );
      tsc.stderr.on( 'data', error => { throw error; } );
      tsc.on( 'close', code => console.log( `${ code }`) );
   } catch( error ) {
      return next( error );
   };
   return undefined;
})));
/* END */
