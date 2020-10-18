async function fn1(){
    // return Promise.resolve(100); // 100
    // return 100; // 100
    return new Promise((resolve)=>{ // 什么也不会输出，因为返回的是pending状态的promise对象
        resolve(100);
        return 100;
    })
}

async function fn2(){
    let res = await fn1();
    console.log(res);
}

fn2();