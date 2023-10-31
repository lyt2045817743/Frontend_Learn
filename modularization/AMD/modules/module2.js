define(['module1'], function(m1) {
  return {
    log: () => {
      console.log('log in module2', m1.data);
    }
  }
})