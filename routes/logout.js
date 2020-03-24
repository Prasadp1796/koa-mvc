const router = require('koa-router')();

router.prefix('/logout');
router.get('/', async function(ctx, next){
    ctx.session = null
    await ctx.redirect('/login')
});

module.exports = router;