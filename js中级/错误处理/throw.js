// function MyError(name, message) {
//   this.name = name;
//   this.message = message;
// }

// function testFun() {
//   throw new MyError('MyError', '自定义异常');
// }

// try {
//   testFun();
// } catch (error) {
//   console.error(error, error instanceof Error);
// }




// try {
//   throw '这是一个错误';
// } catch (error) {
//   console.log(error, error instanceof Error);
// }



try {
  throw new Error('自定义错误');
} catch (error) {
  console.log(error, error instanceof Error);
}


