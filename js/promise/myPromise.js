function MyPromise(executor) {
  this.status = 'pending';
  var _this = this;
  var resultHandle = [];
  function resolve(data) {
    if (_this.status === 'pending') {
      _this.status = 'fulfilled';
      _this.result = data;
      handlerAllExe();
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
    return new MyPromise((resolve, reject) => {
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

MyPromise.resolve = function(value) {
  // 这个判断很重要，不然会将promise对象作为数据直接传给then回调
  if (value instanceof MyPromise) {
    return value;
  }
  return new MyPromise(resolve => resolve(value));
}

MyPromise.reject = function(err) {
  if (value instanceof MyPromise) {
    return value;
  }
  return new MyPromise((_resolve, reject) => reject(err));
}

MyPromise.all = function(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    for (let i = 0; i < promises.length; i++) {
      const item = promises[i];
      MyPromise.resolve(item).then((data) => {
        result[i] = data;
        // resolve和reject的调用都应该在then或catch事件处理函数内，否则就是同步改变状态了
        if (result.length === promises.length && !result.includes(undefined)) {
          resolve(result);
        }
      }).catch((err) => {
        reject(err);
      })
    }
  })
}

MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then(resolve).catch(reject);
    }
  })
}

MyPromise.any = function(promises) {
  return new MyPromise((resolve, reject) => {
    const reasons = [];
    for (let i = 0; i < promises.length; i++) {
      const item = promises[i];
      MyPromise.resolve(item).then(resolve).catch(error => {
        reasons[i] = error;
        if (reasons.length === promises.length && !reasons.includes(undefined)) {
          try {
            reject(new AggregateError(reasons)); // node版本过低的话则报ReferenceError异常
          } catch (error) {
            if (error instanceof ReferenceError) {
              reject(reasons);
            }
          }
        }
      })
    }
  })
}

MyPromise.allSettled = function (promises) {
  const onFulfilled = data => ({ status: 'fulfilled', data });
  const onRejected = reason => ({ status: 'rejected', reason });
  return MyPromise.all(promises.map(item => MyPromise.resolve(item).then(onFulfilled, onRejected)));
}

MyPromise.allSettled2 = function(promises) {
  return new MyPromise((resolve) => {
    const result = [];
    for (let i = 0; i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then((value) => {
        result[i] = { status: 'fulfilled', value };
        if (result.length === promises.length && !result.includes(undefined)) {
          resolve(result);
        }
      }).catch((reason) => {
        result[i] = { status: 'rejected', reason };
        if (result.length === promises.length && !result.includes(undefined)) {
          resolve(result);
        }
      })
    }
  })
}

const p = new MyPromise((resolve, reject) => {
  resolve('success');
  // reject('error');
})

p.then((data) => {
  console.log(data);
  // fun()
}, (error) => {
  console.log('then onRejected: ', error);
}).catch((error) => {
  console.log('next promise: ', error);
})

const p2 = MyPromise.all([
  new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
  new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
  3,
  // new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error')), 100)),
]).then((data) => {
  console.log('promise all data: ', data);
}).catch((err) => {
  console.log('promise all err: ', err);
})

// 或allSettled2
MyPromise.allSettled([
  new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
  new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
  new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error')), 100)),
]).then((data) => {
  console.log('promise allSettled data: ', data);
})

MyPromise.race([
  new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
  new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
  new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error')), 100)),
]).then((data) => {
  console.log('promise race data: ', data);
}).catch(err => {
  console.log('promise race error: ', err);
})

MyPromise.any([
  // new MyPromise(resolve => setTimeout(() => resolve(1), 300)),
  // new MyPromise(resolve => setTimeout(() => resolve(2), 200)),
  new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error 50')), 50)),
  new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error 200')), 200)),
  new MyPromise((_resolve, reject) => setTimeout(() => reject(new Error('error 100')), 100)),
]).then((data) => {
  console.log('promise any data: ', data);
}).catch(err => {
  console.log('promise any error constructor: ', err.constructor.name);
  console.log('promise any error: ', err);
})