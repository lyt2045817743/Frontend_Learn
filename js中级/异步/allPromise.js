const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p1 log');
    resolve(1)
  }, 20)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p2 log');
    reject(new Error('p2 error'));
  }, 20)
}).catch((e) => {
  console.log('p2 catch', e);
  return 'p2 has err';
})

const all = Promise.all([p1, p2]).then((res) => {
  console.log('all then', res);
}).catch((e) => {
  console.log('all catch', e);
})
