strArr=['c','d','a','bb','e']
strArr.sort()
var result='';
for(var i=0;i<strArr.length;i++){
    i!==strArr.length-1?result+=strArr[i]+' ':result+=strArr[i];
}
console.log(result);
