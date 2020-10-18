function fn1(num){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(num * num);
        },1000)
    })
}

const arr = [1, 2, 3];
arr.forEach(async(i)=>{
    let res = await fn1(i);
    console.log(res);
})