const arr = [1, 2, 3];
const obj = {
  a: 1,
  b: 2
};
const map = new Map([['a', '1'], ['b', '2']]);

const arrI = arr[Symbol.iterator]?.();
// const objI = obj[Symbol.iterator]?.();
const mapI = map[Symbol.iterator]?.();
// console.log(arrI?.next?.(), mapI?.next?.());

obj[Symbol.iterator] = () => {
  const keys = Object.keys(obj);
  let index = 0;
  return {
    next: () => {
      return {
        value: [keys[index], obj[keys[index]]],
        done: index++ === keys.length
      }
    }
  }
}
// 1 迭代器调用
// const objI = obj[Symbol.iterator]()
// while(true) {
//   result = objI.next();
//   if (!result.done) {
//     console.log(result.value, result.done);
//   } else {
//     break;
//   }
// }

// 对象使用for of 遍历
for(const item of obj) {
  console.log('for of', item);
}

console.log('扩展运算符', [...obj]);