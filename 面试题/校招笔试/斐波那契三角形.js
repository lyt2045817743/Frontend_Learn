var n=2;
for(var i=0;i<n;i++){
    length=i+1;
    var arr=feibo(length);
    var arr2=[...arr];
    arr2=arr2.slice(0,arr.length-1).reverse();
    var arr3=arr.concat(arr2);
    var result='';
    for(var j=0;j<arr3.length;j++){
        j!=arr3.length-1?result+=arr3[j]+' ':result+=arr3[j];
    }
    // print(result);
    console.log(result+'\n');
    
}

function feibo(m){
   var result=[];
   function subFeibo(n){
        if(n<=2){
            return 1;
        }else{
            return subFeibo(n-1)+subFeibo(n-2);
        }
   }
   for(var i=1;i<m+1;i++){
    result.push(subFeibo(i));
   }
   return result;
}