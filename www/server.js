'use strict';

const winston = require( 'winston' );
const koaLogger = require( 'koa-logger-winston' );
const Koa = require( 'koa' );
const app = new Koa();

/* logger setup */
const loggerOptions = {
   level: 'silly',
   colorize: true,
   filename: 'log/access.log',
   maxsize: 102400,
   maxFiles: 12,
   tailable: true
};
winston.add( winston.transports.File, loggerOptions );
app.use( koaLogger( winston ) );

app.use( async ( ctx, next ) => {
   await next();
   ctx.body = 'Hello World';
});

app.listen( 3000 );
