function huiwen(str){
    let arr=str.split('');
    for(let i=0;i<arr.length/2;i++){
        let head=arr[i];
        let rear=arr[arr.length-i-1];
        if(head!==rear){
            return false;
        }
    }
    return true;
}

let result=huiwen('qwwq');
console.log(result);