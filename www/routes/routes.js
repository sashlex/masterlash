'use strict';

const Router = require( 'koa-router' );
const router = new Router();

router.get( '/', async ( ctx, next ) => {
   await next();
   ctx.body = 'Hello World!';
});

module.exports = router;
