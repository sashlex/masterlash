'use strict';

import * as configs from './configs/configs';
import * as routes from './routes/routes';
import * as winston from 'winston';
import * as koaLogger from 'koa-logger-winston';
import * as pug from 'pug';
import * as Koa from 'koa';
const app = new Koa();

/* error handling */
app.use( async ( ctx, next ) => {
   try {
      await next();
   } catch( error ) {
      error.status = error.statusCode || error.status || 500;
      throw error;
   }
});

/* logger setup */
winston.remove( winston.transports.Console );
winston.add( winston.transports.Console, configs.LOGGER_CONSOLE_OPTIONS );
winston.add( winston.transports.File, configs.LOGGER_FILE_OPTIONS );
app.use( koaLogger( winston ) );

/* views midleware setup */
app.use( async ( ctx, next ) => {

   /* set render options */
   let options = Object.assign( {}, configs.PUG_OPTIONS );
   options.app = app;

   /* render */
   ctx.render = path => {
      ctx.body =  pug.renderFile( `${ configs.VIEWS_DIR }/${ path }` );
      return ctx.body;
   };
   return await next();
});

/* routes setup */
app.use( routes.routes() ).use( routes.allowedMethods() );

/* on port 3000 */
const server = app.listen( configs.PORT );

/* the application was started successfully */
configs.LOG && winston.log( 'info', `The application was started successfully on port: ${configs.PORT}.` );
