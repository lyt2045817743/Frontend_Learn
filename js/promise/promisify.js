function promisify(fun) {
  return function() {
    return new Promise((resolve, reject) => {
      const args = Array.from(arguments);
      fun(...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }
}

function f(a, b, callback) {
  let sum;
  setTimeout(() => {
    sum = a + b;
    if(typeof callback === 'function') {
      callback(null, sum)
    }
  }, 100);
}

const newFun = promisify(f);
newFun(1, 2).then((data) => {
  console.log(data);
})

a = async () => {
  const data = await newFun(3, 4);
  console.log('await result: ', data);
}
a();