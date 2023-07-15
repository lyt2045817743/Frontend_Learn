function compose (...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

function fn1(x) {
  return x * x;
}

function fn2(x) {
  return x + 1;
}

const newFn = compose(fn1, fn2);
const result = newFn(1);
console.log('result: ', result);