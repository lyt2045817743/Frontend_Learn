var a='AABC';
var b='D';
var map={};
var arr1=a.split('');
var arr2=b.split('');
var res=0;
for(var i=0;i<arr1.length;i++){
    if(!map[arr1[i]]){
        map[arr1[i]]=[arr1[i]];
    }
    else{
        map[arr1[i]].push(arr1[i]);
    }
}
console.log(map);

for(var j=0;j<arr2.length;j++){
    if(map[arr2[j]]&&map[arr2[j]].length!==0){
        res++;
        map[arr2[j]].pop();
    }
}
// print(res);
console.log(res);
