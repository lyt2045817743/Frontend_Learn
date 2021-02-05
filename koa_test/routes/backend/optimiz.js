const router = require('koa-router')();
const UserName = require('../../models/username');
const InitRes = require('../../config/InitRes');
const { chRegister } = require('../../config/checkParams');


router.post('/register', async ctx => {
    console.log('注册ing...');
    
    const { name, password, openid } = ctx.request.body;
    const user = new UserName({
        name,
        password,
        openid
    })

    new chRegister(ctx, name, password).chRegisterFun();

    await user.save()
    .then( res => {
        console.log('注册成功');
        new InitRes(ctx, '注册成功').success();
    })
    .catch( err => {
        console.log(err);
        new InitRes(ctx).fail('注册失败', 500);
    })

})

module.exports = router.routes();