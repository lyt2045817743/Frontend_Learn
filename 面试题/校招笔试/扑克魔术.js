var nums=['3','1','4','2','5','6'];
var count=2;
var n=nums.length;
for(var i=0;i<count;i++){
    var newArr=[];
    var arr1=nums.slice(0,n/2);
    var arr2=nums.slice(n/2);
    for(var j=0;j<n/2;j++){
        newArr.push(arr2[j]);
        newArr.push(arr1[j]);
    }
    nums=newArr;
}

for(var i=0;i<n;i++){
    i!=n-1?console.log(parseInt(nums[i])+' '):console.log(parseInt(nums[i]));
}

