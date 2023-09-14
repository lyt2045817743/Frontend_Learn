const p = new Promise(resolve => setTimeout(resolve, 100));

p.then(() => {
  fun()
}, (err) => {
  console.log('then的第二个参数捕获到异常：', err);
}).catch((err) => {
  console.log('then后面的promise捕获到异常：', err);
})