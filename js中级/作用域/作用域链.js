// 可以通过debug看下不同时刻的函数及其[[Scopes]]
let a = 0;
let b = '1'
function fun(a) {
  // let a = 1;
  return () => {
    console.log(a, b);
  }
}
console.log(111);
const f = fun(1);
f();
console.log(111);
fun(2);



