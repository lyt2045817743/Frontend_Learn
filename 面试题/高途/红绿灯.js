
// 红灯3s，绿灯2s，黄灯1s，如此循环
function run(){
    new Promise((resolve, reject) => {
        console.log('红灯', new Date().getSeconds());
        setTimeout(() => {
            resolve()
        }, 3000)
    }).then(() => {
        console.log('绿灯', new Date().getSeconds());
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
    }).then(() => {
        console.log('黄灯', new Date().getSeconds());
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    }).then(() => {
        run();
    });
}

run();

// function trafficLight() {
//     new Promise((resolve) => {
//         console.log('红灯', new Date().getSeconds());
//         setTimeout(resolve, 3000);
//     }).then(() => {
//         new Promise((resolve) => {
//             console.log('绿灯', new Date().getSeconds());
//             setTimeout(resolve, 2000);
//         })
//     }).then(() => {
//         new Promise((resolve) => {
//             console.log('黄灯', new Date().getSeconds());
//             setTimeout(resolve, 1000);
//         })
//     }).then(() => trafficLight()); // 循环调用
// }

// // 启动红绿灯循环
// trafficLight();
  