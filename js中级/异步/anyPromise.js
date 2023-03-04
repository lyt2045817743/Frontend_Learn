const p1 = new Promise((resolve, reject) => setTimeout(()=> reject('p1 fail'), 20))

const p2 = new Promise((resolve, reject) => setTimeout(()=> reject('p2 fail'), 10))

Promise.any([p1, p2]).then(() => {}).catch((agg) => console.log(agg.errors))