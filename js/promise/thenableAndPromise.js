const p = new Promise(resolve => setTimeout(() => resolve(1), 100));

p.then((data) => {
  return {
    data,
    // then: resolve => setTimeout(() => resolve(data), 3000) // thenable的对象可以作为promise对象使用，它的then函数作为新的executor执行，而如果是普通对象（没有then方法），则直接将对象作为结果
  }
}).then((data) => {
  console.log(data);
})