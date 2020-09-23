// var x1=-1;
// var y1=0;
// var x2=5;
// var y2=3;

// var x;
// var y;
// var r1=0;
// var r2=0;
// var toA;
// var toB;
// var line='0 2'
// // while(line){
//     nums=line.split(' ');
//     x=parseInt(nums[0]);
//     y=parseInt(nums[1]);
//     toA=instance(x1,y1,x,y);
//     toB=instance(x2,y2,x,y);
//     r1=(toB>toA&&r1<toA)?toA:r1;
//     r2=(toA>toB&&r2<toB)?toB:r2;
// // }
// var line='5 2'
//     nums=line.split(' ');
//     x=parseInt(nums[0]);
//     y=parseInt(nums[1]);
//     toA=instance(x1,y1,x,y);
//     toB=instance(x2,y2,x,y);
//     r1=(toB>toA&&r1<toA)?toA:r1;
//     r2=(toA>toB&&r2<toB)?toB:r2;

function instance(n1,m1,n2,m2){
    return Math.sqrt(Math.pow(n2-n1,2)+Math.pow(m2-m1,2));
}
// console.log(parseInt(Math.pow(r1,2)+Math.pow(r2,2)));

// 4 0 0 5 0
// 9 4
// 8 3
// -1 0
// 1 4
console.log(instance(5,0,1,4));