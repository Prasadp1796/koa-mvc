const user = require('../models/users.model');

class ManageUsers{
     /**
     * Find a city
     * @param {ctx} Koa Context
     */
    async find(ctx) {
        const users = await user.find();
        await ctx.render('ManageUsers/index', {users: users});
    }

    /**
    * Add a user
    * @param {ctx} Koa Context
    */
    async add(ctx) {
        try{
            const newUser = await user(ctx.request.body).save();
           await ctx.redirect('/users');
        }catch(Err){
            console.log(Err);
            ctx.status = 500;
        }
    }

    /**
    * Find a user by id
    * @param {ctx} Koa Context
    */
   async findById(ctx){

   }
}

module.exports = new ManageUsers();