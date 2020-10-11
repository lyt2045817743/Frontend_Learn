// 58
function total(str){
    let arr=str.split('');
    let obj={};
    let max=0,result='';

    // 统计每个字符出现的次数
    for(let i=0,len=arr.length;i<len;i++){
        obj[arr[i]]=obj[arr[i]]!==undefined?++obj[arr[i]]:obj[arr[i]]=1;
    }

    // 找到最多字母
    for(var item in obj){
        if(obj[item]>max){
            max=obj[item];
            result=item;
        }
    }

    return result;
}

let result=total('aabbbbbb');
console.log(result);
