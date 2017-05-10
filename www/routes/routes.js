'use strict';

const configs = require( '../configs/configs' );
const Router = require( 'koa-router' );
const router = new Router();

router.get( '/', async ( ctx, next ) => {
   await next();
   ctx.state = {
      title: 'Title',
      body: 'Hello World!'
   };
   return ctx.render( `index.hbs` );
});

module.exports = router;
