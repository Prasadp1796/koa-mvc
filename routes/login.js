const router = require('koa-router')();
const loginController = require('../controllers/log_in.controller');

router.prefix('/login');

//Method To Render LogIn Page
router.get('/', async (ctx, nex)=>{
    await ctx.render('Login/index');
});

router.post('/', loginController.logInUser);

module.exports = router;