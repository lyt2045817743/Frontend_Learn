async function asyncFun() {
  const result = await Promise.resolve(1);
  // 虽然await后面的代码会等待promise变为settled后执行，但函数外部的同步代码不应该受其影响，所以return语句不会等待，它会返回一个promise对象
  console.log('result before return: ', result); // 后输出：result before return:  1
  return result;
}

const result = asyncFun();
console.log('result after return: ', result); // 先输出：result after return:  Promise { <pending> }

async function asyncFunFulfilled() {
  const result = await Promise.resolve(1);
  return Promise.resolve(result);
}

asyncFunFulfilled().then((result2) => {
  console.log('asyncFunFulfilled return2: ', result2);
})

async function asyncFunRejected() {
  // return Promise.reject(new Error('错误'));
  throw new Error('错误'); // 和上面作用一样
}

asyncFunRejected().catch((error) => {
  console.log('asyncFunRejected error: ', error);
})