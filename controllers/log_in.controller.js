const user = require('../models/users.model');

class LoginController{
    /**
     * Method To Log In User
     * @param {ctx} Koa Context
     */
    async logInUser(ctx){
    
        const userData = ctx.request.body;
        try{
            const loginUser = await user.findOne({emailId: userData.emailId});
            if(!loginUser){
                ctx.status = 203;
            }else{
                ctx.session.emailId = loginUser.email;
                console.log(ctx.session);
                await ctx.redirect('/users');
            }
        
        }catch(err){
            console.log(err);
            ctx.status = 500;
        }
    }
     
}

module.exports = new LoginController();