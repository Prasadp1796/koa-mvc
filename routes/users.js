const router = require('koa-router')();
const isLogeedIn = require('../config/isLoggedIn');
const usersController = require('../controllers/manageUsers.controller');

router.prefix('/users');
//Router To Render Manage Users Page
router.get('/',  isLogeedIn,usersController.find);

//Router To Render Create New User Page
router.get('/create', isLogeedIn,async function(ctx, next){
  await ctx.render('ManageUsers/createUser');
}); 

//Router To Create New User
router.post('/create', isLogeedIn, usersController.add);

module.exports = router
