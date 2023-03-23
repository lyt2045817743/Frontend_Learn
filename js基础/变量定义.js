// var name = 'lyt';
// var name = 'lyt2'
// // let name = 'lyt2'; // SyntaxError: Identifier 'name' has already been declared
// console.log(name2); // ReferenceError: Cannot access 'name2' before initialization
// let name2 = 'lala'
// console.log(name);




// var temp = '123';
// if(true) {
//   let temp2 = '456';
//   console.log(temp, temp2); // 123 456
//   // let temp; // ReferenceError: Cannot access 'temp' before initialization
// }


// 函数声明也会被提升
// if(true) {
//   function f() {
//     console.log(123);
//   }
// }
// f(); // 123


// if (true) let x = 1; // "let" 声明只能在块的内部声明。ts(1157)



// let a = 1;
// function getA() {
//   a = 3
//   console.log(a);
// }
// getA()
// console.log(a); // 3


//  const b; // 必须初始化 "const" 声明。ts(1155)



// let number = 42;
// function printNumber() {
//   console.log(number);
// }
// function log() {
//   let number = 54;
//   printNumber();
// }
// // Prints 42
// log();



// 要把函数编译和函数执行区分开
// let foo = 'foo';
// function bar() {
//   let baz = 'baz';
//   // 打印 'baz'
//   console.log(baz);
//   // 打印 'foo'
//   console.log(foo);
//   number = 42;
//   console.log(number);  // 打印 42
// }

// console.log(number); // ReferenceError: number is not defined