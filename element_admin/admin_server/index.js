const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body')
const cloud = require('tcb-admin-node');

//初始化Koa(nodejs 的框架)
const app = new Koa();

//初始化路由
const router = new Router({
  prefix: "/fellow"
});

//跨域配置（相当于允许任何站点访问）
app.use(cors({
  // origin: ['http://localhost:9528'],
  origin: function (ctx) {
      return [ctx.request.header.origin];
  },
  maxAge: 5,
  credentials: true
}));

//格式化请求参数
app.use(koaBody());

//引入user 控制器
let user = require('./controller/user.js');

//配置控制器响应路由
router.use('/user', user.routes());

//使用router
app.use(router.routes());

//创建监听 端口号 启动服务
app.listen(3000);
console.log("server runing：http://localhost:3000")



