// 遍历ArrayBuffer数据，并将这些数据放在一个新数组中返回
function forEach (arrays) {
  const result = [];
  const views = new Uint8Array(arrays);
  for (let view of views) {
    result.push(view);
  }
  return result;
}

const arrays = new ArrayBuffer(4);
const views = new Uint8Array(arrays);

views[0] = 100;
views[1] = 200;

// const result = concat(views.buffer); // [ 100, 200, 0, 0 ]
const result = forEach(arrays); // [ 100, 200, 0, 0 ]
// console.log('Sample1-遍历: ', arrays, views, result);
console.log('Sample1-遍历: ', result);

// 给定一个Unit8Array数组，返回一个扁平的数组

function concat(arrays) {
  const totalLength = arrays.reduce((a, b) => a + b.length, 0);
  const result = new Uint8Array(totalLength);
  let length = 0;
  for (let views of arrays) {
    result.set(views, length);
    length += views.length;
  }
  return result;
}

const result2 = concat([
  new Uint8Array([1, 2]),
  new Uint8Array([3, 1, 2]),
  new Uint8Array([5, 6]),
  new Uint8Array([4, 2]),
]);

console.log('Sample2: 扁平化Unit8Array数组', result2);