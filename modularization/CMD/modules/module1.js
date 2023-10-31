define(function(require, exports, module) {
  const data = 1;
  exports.data = data;
  exports.log = () => {
    console.log('log in module1', data);
  }
})