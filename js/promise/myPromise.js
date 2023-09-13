function MyPromise(executor) {
  this.status = 'pending';
  this.resultHandle = [];
  function resolve(data) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    this.result = data;
    this.resultHandle.forEach((callback) => {
      try {
        callback(this.result);
      } catch (error) {
        
      }
    })
  }

  function reject(error) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    this.result = error;

  }

  try {
    executor(resolve, reject);
  } catch (e) {
    if (this.status === 'pending') {
      this.status = 'rejected';
      this.result = e;
    };
    throw e;
  }

  this.then = (callback, rejectCallback) => {
    this.resultHandle.push(callback);
    this.errorHandle = rejectCallback;
  }

  this.catch = (rejectCallback) => {
    this.errorHandle = rejectCallback;
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