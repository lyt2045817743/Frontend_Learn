console.log('script start') //1

setTimeout(function() {
  console.log('setTimeout') // 宏任务1 6
}, 0)

new Promise(resolve => {
  console.log('Promise') //2
  resolve()
})
.then(function() {
  console.log('promise1') // 微任务1 4
})
.then(function() {
  console.log('promise2') // 微任务2 5
})

console.log('script end') //3