// function maxCom(arr){
//     let result=0;
//     for(let i=0,len=arr.length;i<len;i++){
//         if(typeof arr[i]!=="number" || JSON.stringify(arr[i]).indexOf('.')>0 || arr[i]<0 || arr[i]!==arr[i]){
//             arr.splice(i,1);
//             i--;
//             len--;
//         }
//     }
//     let currentIndex,currentItem;
//     while(arr.length){
//         currentIndex=maxIndex(arr);
//         currentItem=arr[currentIndex];
        
//         result=result===0?currentItem:result*10+currentItem;

//         // 去除当前数组中最大值
//         arr.splice(currentIndex,1);
//     }
//     return result;
// }

// // 寻找给定数组中最大值的索引
// function maxIndex(arr){
//     let index=0;
//     let maxItem=0;
//     for(let i=0,len=arr.length;i<len;i++){
//         if(arr[i]>maxItem){
//             index=i;
//             maxItem=arr[i];
//         }
//     }
//     return index;    
// }

// let result=maxCom([1.0]);
// console.log(result);

console.log(parseInt(1.0)===1.0);
