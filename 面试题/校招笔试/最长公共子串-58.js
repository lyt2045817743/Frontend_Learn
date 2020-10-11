function maxSubStr(str){
    let arr=str.split(',');
    let maxStr='';
    let i=1;
    while(i>0){
        if(i<=arr[0].length){
            maxStr=arr[0].substr(0,i);
        }
        else{
            return maxStr;
        }
        
        for(let j=1,len=arr.length;j<len;j++){
            if(i>arr[j].length||arr[j].substr(0,i)!==maxStr){
                return maxStr.slice(0,maxStr.length-1);
            }
        }
        i++;
    }
}

let result=maxSubStr('flower,flower,floweght');
console.log(result);
