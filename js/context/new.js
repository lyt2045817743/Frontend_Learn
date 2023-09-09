function myNew(Constructor, ...args) {
  const context = {};
  // 对于原型对象的赋值应该放在构造函数执行的上面，这样可以保证构造函数中需要用到的地方能找到
  context.__proto__ = Constructor.prototype;
  const result = Constructor.call(context, ...args);
  return typeof result === 'object' ? result : context;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.talk = function() {
  console.log('introduce myself', this.name, this.age);
}

function Person2(name, age) {
  this.name = name;
  this.age = age;
  return {
    name
  }
}


const p = myNew(Person, 'lyt', 18);
console.log(p); // Person { name: 'lyt', age: 18 }
p.talk(); // introduce myself lyt 18
console.log(p.__proto__, p.__proto__.__proto__, p.__proto__.__proto__.__proto__); // { talk: [Function (anonymous)] }     [Object: null prototype] {}      null

const p2 = myNew(Person2, 'lyt', 18);
console.log(p2); // { name: 'lyt' }
console.log(p2.__proto__, p2.__proto__.__proto__); // [Object: null prototype] {}    null
