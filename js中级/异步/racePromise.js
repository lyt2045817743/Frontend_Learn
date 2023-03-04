// // 如果不用Promise.race实现
// let flag = false;
// let hasLog = false;
// const p = new Promise((resolve, reject) => {
//   setTimeout(()=> {
//     resolve('in time');
//   }, 500)
// }).then((res) => {
//   flag = true;
//   if (!hasLog) {
//     console.log(res);
//   }
// })

// setTimeout(() => {
//   if (!flag) {
//     console.log('out time');
//     hasLog = true;
//   }
// }, 400);

// 用promise.race实现
const p1 = new Promise((resolve, reject) => setTimeout(()=> resolve('in time'), 500))

const p2 = new Promise((resolve, reject) => setTimeout(()=> reject('out time'), 600))

Promise.race([p1, p2]).then((res) => console.log(res)).catch((err) =>  console.log(err))