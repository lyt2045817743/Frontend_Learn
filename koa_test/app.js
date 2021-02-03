const Koa = require('koa');
const router = require('koa-router')();
const json = require('koa-json');
const mongoose = require('mongoose')

const { dbUrl } = require('./config/base');

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

const app = new Koa();
app.listen(3000)

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

app.use(json());

router.get('/', async(ctx) => {
    ctx.body = {
        data: {
            msg: 'hello'
        }
    }
})
router.get('/list', async(ctx) => {
    console.log(ctx.query);
    console.log(ctx.request.query);
    console.log(ctx.querystring);
    console.log(ctx.request.querystring);
    console.log(ctx.request.url);
    
})
app.use(router.routes());
app.use(router.allowedMethods())