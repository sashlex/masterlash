'use strict';

const configs = require( './configs/configs.js' );
const winston = require( 'winston' );
const koaLogger = require( 'koa-logger-winston' );
const views = require( 'koa-views' );
const Koa = require( 'koa' );
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

/* views setup */
app.use( views( configs.VIEWS_DIR, {
   map: { hbs: 'handlebars' }
}));

app.use( async ( ctx, next ) => {
   await next();
   ctx.body = 'Hello World';
});

app.listen( configs.PORT );

/* the application was started successfully */
configs.LOG && winston.log( 'info', `The application was started successfully on port: ${configs.PORT}.` );
