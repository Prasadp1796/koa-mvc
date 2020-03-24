module.exports = async function(ctx, next){
    if(ctx.session.emailId == undefined)
        await ctx.redirect('/login');
    await next();
}