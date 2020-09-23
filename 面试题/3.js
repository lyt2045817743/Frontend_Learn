function f(){};
var a=f.prototype,b=Object.getPrototypeOf(f);
console.log(a===b);
console.log(a);
b.c=function(){};
console.log(b);

