const router = require('koa-router')();
const UserName = require('../../models/username');


router.post('/register', async ctx => {
    console.log('注册ing...');
    
    const { name, password, openid } = ctx.request.body;
    const user = new UserName({
        name,
        password,
        openid
    })

    await user.save()
    .then( res => {
        console.log('成功');
    })
    .catch( err => {
        console.log('失败');
    })

})

module.exports = router.routes();