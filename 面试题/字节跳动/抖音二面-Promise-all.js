Promise.prototype.myAll=function(arr){
    return new Promise(function(resolve,reject){
        let statusArr=[];
        for(let i=0;i<arr.length;i++){
            if(arr[i].status==='fulfilled'){
                statusArr.push(arr[i].then());
            }
            else{
                statusArr.push(undefined);
            }
        }
        resolve(statusArr);
    })
}