var [length,n]=readline().split(' ');
length=parseInt(length);
n=parseInt(n);
var queueObj={};
for(var i=0;i<length;i++){
    queueObj[i]=new Array(i);
}
// for(var i=0;i<n;i++){
    // var [option,fromIndex,toIndex]=readline().split(' ');
    fromIndex=parseInt(fromIndex);
    toIndex=parseInt(toIndex);
    if(option=='C'){
        remove(fromIndex,toIndex);
    }
    else if(option=='Q'){
        distance(fromIndex,toIndex);
    }
// }
function remove(fromIndex,toIndex){
    queueObj[toIndex]=queueObj[toIndex].concat(queueObj[fromIndex]);
    queueObj[fromIndex]=[];
}
function distance(fromIndex,toIndex){
    for(var item in queueObj){
        first=item.indexOf(fromIndex);
        second=item.indexOf(toIndex);
        if(first==-1||second==-1){
            print(-1);
        }
        else{
            print(Math.abs(first-second));
            break;
        }
    }
}