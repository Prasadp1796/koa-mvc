const router = require('koa-router')()
const usersController = require('../controllers/manageUsers.controller');

router.prefix('/users');

//Router To Render Manage Users Page
router.get('/', usersController.find);

//Router To Render Create New User Page
router.get('/create',async function(ctx, next){
  await ctx.render('ManageUsers/createUser');
}); 

//Router To Create New User
router.post('/create', usersController.add);

module.exports = router
