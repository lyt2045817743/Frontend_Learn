// let obj={
//     a:1,
//     b:'12ab',
//     c:true,
//     // e:null,
//     // d : new Date(),
//     // rep:new RegExp(),
//     // foo:function(){console.log(1);},
// }
let obj1 = {
    a: {
        c: /a/,
        d: undefined,
        b: null
    },
    b: function () {
        console.log(this.a)
    },
    c: [
        {
            a: 'c',
            b: /b/,
            c: undefined,
            d:new Date(),
        },
        'a',
        3
    ]
}
function deepCopy(origin){
    // if(typeof origin !== "object" || origin === null){
    //     return origin;
    // }

    if(Object.prototype.toString.call(origin) !== '[object Object]'){ return origin; };

    let newObj = origin instanceof Array ? [] : {};
    for(let item in origin){
        if(origin.hasOwnProperty(item)){
            newObj[item]=deepCopy(origin[item]);
        }
    }
    return newObj;
}

let result=deepCopy(obj1);
console.log(result);

// console.log(Object.prototype.toString.call(d)!=='[object Object]');
// console.log(Object.prototype.toString.call(obj)!=='[object Object]');

