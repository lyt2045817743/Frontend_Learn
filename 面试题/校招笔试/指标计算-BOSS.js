function calculateStatistics( dataArr ) {
    // write code here
    let len=dataArr.length;
    let mid,min,max,TP90;

    if(dataArr[0]>dataArr[len-1]){
        min=dataArr[len-1];
        max=dataArr[0];
        mid=Math.floor(len/2);
        TP90=Math.floor(len*0.1);
    } else{
        max=dataArr[len-1];
        min=dataArr[0];
        mid=Math.ceil(len/2)-1;
        TP90=Math.ceil(len*0.9)-1;
    }
    return [dataArr[mid],min,max,dataArr[TP90]];
}
let result=calculateStatistics([10,9,8,7,6,5,4,3,2,1]);
// [1,2,3,4,5,6,7,8,9,10]
// [10,9,8,7,6,5,4,3,2,1]
console.log(result);


