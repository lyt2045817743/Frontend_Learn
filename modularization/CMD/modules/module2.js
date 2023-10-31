define(function(require, exports, module) {
  const m1 = require('./module1');
  const data = 2;
  exports.data = data;
  exports.log =  () => {
    console.log('log in module2', m1.data);
  }
})