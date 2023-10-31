define(function() {
  const data = 1;
  return {
    data,
    log: () => {
      console.log('log in module1', data);
    }
  }
})