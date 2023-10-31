define(function(require, exports, module) {
  const m1 = require('./modules/module1')
  m1.log();
  require.async('./modules/module2', function(m) {
    console.log('main async func: ', m.data);
    m.log();
  })
})