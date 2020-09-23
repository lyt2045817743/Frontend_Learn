// var [length,n]=readline().split(' ');
// n=parseInt(n);
// length=parseInt(length);
// var arrStr=readline().split(' ');
// arrStr=arrStr.map((item)=>{
//     return parseInt(item);
// })
var n=2;
length=4;
arrStr=[1,2,3,4];
// for(var i=0;i<n;i++){
    var count=0;
    
    // var [op,start,end]=readline().split(' ');
    // op=parseInt(op);
    // start=parseInt(start);
    // end=parseInt(end);
    op=1;
    start=1;
    end=3;
    var initArr=arrStr.slice(start-1,end);
    var result=[1];
    
    var j=0;
    while(j<end-start){
        var arr=[];
        initArr.forEach((item)=>{
            result.forEach((reItem)=>{
                mul=item*reItem
                arr.push(mul);
                console.log(item,reItem,mul);
                
                if(item*reItem%2==op%2){
                    count++;
                }
            })
        })
        result=arr;
        j++;
    }
    console.log(count);
    
    
    // print(count);
// }