function MyPromise(executor) {
  this.status = 'pending';
  var _this = this;
  var resultHandle = [];
  function resolve(data) {
    if (_this.status === 'pending') {
      _this.status = 'fulfilled';
      _this.result = data;
      handlerExe();
    }
  }

  function reject(error) {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      _this.result = error;
      handlerAllExe();
    }
  }

  function handlerAllExe() {
    while(resultHandle.length) {
      var curHandle = resultHandle.shift();
      handlerEachExe(curHandle);
    }
  }

  function handlerEachExe({ onFulfilled, onRejected, resolve, reject }) {
    try {
      if (_this.status === 'fulfilled') {
        if (typeof onFulfilled === 'function') {
          const result = onFulfilled(_this.result);
          resolve(result);
        } else {
          resolve(_this.result);
        }
      } else if (_this.status === 'rejected') {
        if (typeof onRejected === 'function') {
          const result = onRejected(_this.result);
          resolve(result);
        } else {
          reject(_this.result);
        }
      }
    } catch (error) {
      reject(error);
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

  this.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      if (_this.status !== 'pending') {
        handlerEachExe({ onFulfilled, onRejected, resolve, reject });
      } else {
        resultHandle.push({
          onFulfilled,
          onRejected,
          resolve,
          reject
        })
      }
    })
  }

  this.catch = function (onRejected) {
    return _this.then(null, onRejected);
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve('success');
  // reject('error');
})

p.then((data) => {
  console.log(data);
  fun()
}, (error) => {
  console.log('then onRejected: ', error);
}).catch((error) => {
  console.log('next promise: ', error);
})