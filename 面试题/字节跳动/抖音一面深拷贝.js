function deepClone(obj){
    if(typeof obj!=='object'){
        return obj;
    }
    let newObj=Array.isArray(obj)?[]:{};
    for(let item in obj){
         if(typeof obj=="object"){
            newObj[item]=deepClone(obj[item]);
        }else{
            newObj[item]=obj[item];
        }
    }
    return newObj;
}

let result=deepClone([[1,2,3],[4,5,6]]);
console.log(result);