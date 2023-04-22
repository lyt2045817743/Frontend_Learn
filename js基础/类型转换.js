const obj = {
  a: 1,
  toString() {
    console.log('====================================');
    console.log(obj);
    console.log('====================================');
  }
}

const obj2 = obj;

// const num = '2';
// console.log(num == 2);
// console.log(typeof num);

console.log(obj == 1);
// console.log(obj === 1);
// console.log(obj == '1');
// console.log(obj == obj2);