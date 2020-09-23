function sid(a){
    a[0]=a[2];
}
function bar(a,b,c){
    c=10;
    sid(arguments);
    return a+b+c;
}
var result=bar(1,1,1);
console.log(result);
