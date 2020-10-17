console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
.then(function() {
  console.log('promise1');
  // throw new Error();
}).catch(function(){
  console.log('catch');
})
.then(function() {
  console.log('promise2');
  console.log(this);
  
})

console.log('script end')