const p1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve('success');
    setTimeout(() => {
        console.log(2);
        reject('fail')
    })
})

console.log(3);

setTimeout(() => {
    console.log(4);
}, 100)

console.log(5);

setTimeout(() => {
    console.log(6);
})

const p2 = p1.then(res => {
    console.log(res);
    setTimeout(() => {
        console.log(7);
    }, 0)
    return res
}, error => {
    console.log(error);
    return error
})

console.log(p2 === p1);