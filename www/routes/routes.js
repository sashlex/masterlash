'use strict';

const configs = require( '../configs/configs' );
const Router = require( 'koa-router' );
const router = new Router();

router.get( '/', async ( ctx, next ) => {
   await next();
   return ctx.render( 'content.pug' );
});

module.exports = router;
