// function Person (name, age) {
//   this.name = name;
//   this.age = age;
//   // return {
//   //   address: 'lala'
//   // }
//   console.log();
// }

const obj = {};
const obj2 = new Object({})

// Person.key = 'Person'

// const p = new Person('ykl', 25);
// console.log(Person.prototype);
// console.log(obj.__proto__, obj2.__proto__, obj.__proto__ === obj2.__proto__);
// console.log(obj.bind, obj.call, obj.apply, '------', obj2.bind, obj2.call, obj2.apply); // 全是undefined
// console.log(Object, Function, String); // 全是function
// console.log(Object.constructor === Function, Function.constructor === Function); // 非正规写法，实质上是在其__proto__上找到的constructor属性
// console.log(Object.__proto__.constructor === Function); // true
// console.log(Object instanceof Function, Function instanceof Object);
// console.log(Object.prototype.__proto__ === null, Function.prototype.__proto__.__proto__ === null);




// const obj = { a: 1 };
// const b = Object.create(obj);
// b.a = 'lal';
// console.log(obj === b, 'obj: ', obj, 'b:', b); // false
// console.log(b.__proto__ === obj);
// console.log(obj.prototype, b.prototype);
// console.log(b instanceof obj); // 报错 TypeError: Right-hand side of 'instanceof' is not callable

// const obj2 = { a: 1, b: { c: 1 } };
// const d = Object.create(obj2);
// d.b.c = 'laa';
// console.log(obj2.b === d.b); // true 不能实现深拷贝




console.log(window instanceof Object);