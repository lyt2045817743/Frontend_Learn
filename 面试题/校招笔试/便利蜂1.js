var arr='[[1,2],[2,3],[3,4],[4,5],[2,5]]';
arr=JSON.parse(arr);

var obj={};
for(var i=0;i<arr.length;i++){
    if(obj[arr[i][0]]===undefined){
        obj[arr[i][0]]=[(arr[i][1]).toString()];
    }
    else{
        obj[arr[i][0]].push((arr[i][1]).toString());
    }
}
// print(obj);
console.log(obj);
