const obj = {
  value: 1
};

function fun1(value2, value3) {
  console.log(this.value, value2, value3);
}
// 实质上转变成了类似这种格式
// const obj = {
//   value: 1,
//   fun1
// };

// 需要注意context参数有可能会被传Null，这时候应该默认设置为globalThis
Function.prototype.myCall = function(context, ...args){
  const _context = context ?? globalThis;
  const key = Symbol('key');
  _context[key] = this;
  _context[key](...args);
  delete _context[key];
}

console.log('myCall');
fun1.myCall(obj, 2, 3);
fun1.myCall(null, 2, 3);

// args的默认值需要注意
Function.prototype.myApply = function(context, args = []){
  const _context = context ?? globalThis;
  const key = Symbol('key');
  _context[key] = this;
  _context[key](...args);
  delete _context[key];
}

console.log('myApply');
fun1.myApply(obj, [4, 5]);

Function.prototype.myBind = function(context, ...args){
  // 注意保存外部函数的this
  const _this = this;
  return function() {
    _this.myCall(context, ...args);
  }
}

console.log('myBind');
fun1.myBind(obj, 6, 7)();

// 如果函数的参数分多次传
Function.prototype.myBind2 = function(context, ...args){
  // 注意保存外部函数的this
  const _this = this;
  return function(argInner) {
    _this.myCall(context, ...args.concat(argInner));
  }
}
console.log('myBind2');
fun1.myBind2(obj, 8)(9);

function Person(name, age) {
  console.log(this.value);
  this.name = name;
  this.age = age;
}

Person.prototype.sex = '女';

// 兜底，为了防止bind返回的函数被当做构造函数使用，此时两个this会发生冲突，需保留原有this（实例）的指向
Function.prototype.myBind3 = function(context, ...args){
  // 注意保存外部函数的this
  const _this = this;
  const fNOP = function(){}
  const fBound = function() {
    // 如果 this instanceof fBound 为真：说明此时的this指向构造函数new 出来的那个实例
    _this.myCall(this instanceof fBound ? this : context, ...args);
  }
  fNOP.prototype = _this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

// console.log('myBind as 构造函数');
// const NewPerson = Person.myBind(obj, 'lyt', 18);
// const p = new NewPerson();
// console.log(p.name, p.age); // 1 undefined undefined

console.log('myBind3 as 构造函数');
const NewPerson = Person.myBind3(obj, 'lyt', 18);
const p = new NewPerson();
console.log(p.name, p.age, p.sex); // undefined lyt 18