// // 普通版
function add1(a) {
  let sum = a;
  return function (b) {
    sum += b;
    return function (c) {
      sum += c;
      return sum;
    }
  }
}

const result1 = add1(5)(2)(3); // result1 10
console.log('result1', result1);

// 进阶版：每次函数调用返回一个新函数，通过新函数的属性或方法获取返回值。
// 需要对调用结果进行二次调用才能得到值
function add2() {
  // 定义一个数组进行参数的存储
  var args = Array.prototype.slice.call(arguments)

  // 存储所有参数
  var adder = function() {
    args.push(...arguments)
    return adder
  }

  // 利用toString的隐式转换的特性，进行结果计算并返回
  adder.toString = function() {
    return args.reduce((a, b) => a + b)
  }

  return adder
}

const result2 = +add2(1)(2)(3); // +：隐式类型转换，相当于调用其toString方法 -> +(add2(1)(2)(3).toString())
console.log('result2:', result2); // result2: 6 (number)


// 通用版：将一个函数柯里化
// add函数需要是已知的
function curry(fn) {
  const args = [], argMaxLength = fn.length;
  const closure = function () {
    args.push(...arguments);
    if (args.length === argMaxLength) {
      return fn(...args);
    }
    return closure;
  }
  return closure;
}

function add(a, b, c, d) {
  return a + b + c + d;
}

const myAdd = curry(add);
const result3 = myAdd(1, 2)(3)(4);
console.log('result3', result3); // result3 10