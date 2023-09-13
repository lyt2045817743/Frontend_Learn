function MyPromise(executor) {
  this.status = 'pending';
  var resultHandle = [];
  function resolve(data) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    this.result = data;
    handlerExe();
  }

  function reject(error) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    this.result = error;
    handlerExe();
  }

  function handlerExe() {
    while(resultHandle.length) {
      var curHandle = resultHandle.shift();
      var { onFulfilled, onRejected } = curHandle;
      try {
        if (this.status === 'fulfilled') {
          if (typeof onFulfilled === 'function') {
            onFulfilled(this.result);
          }
        } else if (this.status === 'rejected') {
          if (typeof onRejected === 'function') {
            onRejected(this.result);
          }
        }
      } catch (error) {
        onRejected(error);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

  this.then = (onFulfilled, onRejected) => {
    this.resultHandle.push(onFulfilled);
    this.errorHandle = onRejected;
    return new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(this.result);
            resolve(result);
          } else {
            resolve(this.result);
          }
        } catch (error) {
          reject(error);
        }
      } else if (this.status === 'rejected') {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(this.result);
            resolve(result);
          } else {
            reject(this.result);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resultHandle.push({
          onFulfilled,
          onRejected
        })
      }
    })

  }

  this.catch = (onRejected) => {
    return this.then(null, onRejected);
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve('success');
  reject('error')
})

p.then((data) => {
  console.log(data);
}, (error) => {
  console.error(error);
})

p.then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
})