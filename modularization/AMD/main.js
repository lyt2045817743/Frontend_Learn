(
  function() {
    require.config({
      baseUrl: 'modules/',
      paths: {
        module1: './module1',
        module2: './module2'
      }
    })

    require(['module1', 'module2'], function(m1, m2) {
      m1.log();
      m2.log();
    })
  }
)()