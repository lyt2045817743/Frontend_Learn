const Koa = require('koa');
const router = require('koa-router')();
// const json = require('koa-json');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const banner = require('./routes/backend/optimiz');
const { dbUrl } = require('./config/base');
const MidWareOfErr = require('./config/MidWareOfError');

const app = new Koa();
app.use(bodyParser());
app.use(MidWareOfErr)

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((res) => {
    console.log('数据库链接成功');
})
.catch((err) => {
    console.log('数据库链接失败');
})


// app.use(banner).use(router.allowedMethods());
router.use('/api/banner', banner)
app.use(router.routes());
app.use(router.allowedMethods());













app.listen(3000);
console.log('koa-test启动成功！');





// 练习代码
// 中间件
// app.use(async(ctx, next) => {
//     console.log(1);
//     // 1
//     await next(); // next返回的是一个promise  1 3 4 2

//     // // 2
//     // next().then((res)=>{
//     //     console.log(res); // 1 3 2 4 suceess
//     // })

//     // // 3
//     // let result =await next();
//     // console.log(result); // 1 3 4 suceess 2
    
//     console.log(2);
// })

// app.use(async(ctx,next) => {
//     console.log(3);
//     await next();
//     console.log(4);
//     // return 'suceess'
// })

// json
// app.use(json());

// 路由
// router.get('/', async(ctx) => {
//     ctx.body = {
//         data: {
//             msg: 'hello'
//         }
//     }
// })
// router.get('/list', async(ctx) => {
//     console.log(ctx.query);
//     console.log(ctx.request.query);
//     console.log(ctx.querystring);
//     console.log(ctx.request.querystring);
//     console.log(ctx.request.url);
    
// })
// app.use(router.routes());
// app.use(router.allowedMethods())
