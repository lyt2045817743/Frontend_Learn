function throttle(fn, time) {
    // const now = Date.now();
    let timer = null;
    return function () {
        if (!timer) {
            fn();
            timer = setTimeout(() => {
                fn()
                // setTimeout 返回的定时器标识符是在 setTimeout 函数执行完毕后才生成的，而不是在 setTimeout 函数内部的回调函数执行之前就可用的。因此，无法在 setTimeout 的回调函数内部直接使用 clearTimeout 来清除定时器
                // clearTimeout(timer); // 无效
                timer = null;
            }, time);
        }
    }
}

const newFun = throttle(() => {
    console.log(1);
}, 2000);

setInterval(newFun, 100)