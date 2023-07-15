const arr = [1, 2, 3, 4, 5];

// reduce中回调函数的前两个参数，不一定需要是同一数据类型
const result = arr.reduce((a, b) => {
  return {
    sum: a.sum + b,
    multi: a.multi * b
  }
}, {
  sum: 0,
  multi: 1
})

console.log('result:', result);