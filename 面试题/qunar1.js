function deleteOne(arr,target){
    let index=arr.indexOf(target);
    while(index!==-1){
        arr.splice(index,1);
        index=arr.indexOf(target);
    }
    return arr;
}

function deleteSameNum(str){
    let arr=str.split(',');
    let obj={};
    for(let i=0;i<arr.length;i++){
        if(obj[arr[i]]){
            obj[arr[i]]++;
        }
        else{
            obj[arr[i]]=1;
        }
    }
    let values=Object.values(obj);
    let maxCount=Math.max(...values);
    for(var item of Object.keys(obj)){
        if(obj[item.toString()]===maxCount){
            arr=deleteOne(arr,item.toString());
        }
    }
    return arr.join(',');
}

let nums='1,1,2,3,4,1';
let result=deleteSameNum(nums);
console.log(result);
