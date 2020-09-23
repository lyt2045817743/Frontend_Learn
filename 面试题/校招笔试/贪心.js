// function Thing(num,weight,price){
//     this.num=num;
//     this.weight=weight;
//     this.price=price;
// }

// var [n,p]=read_line().split(' ');
// n=parseInt(n);
// p=parseInt(p);
// var arr=[];

// for(var i=0;i<n;i++){
//     var [num,weight,price]=read_line().split(' ');
//     arr.push(new Thing(parseInt(num),parseInt(weight),parseInt(price)));
// }
var p=10;
arr=[{num:2,weight:2,price:3},{num:1,weight:5,price:10},{num:2,weight:4,price:12}]

arr=arr.sort((a,b)=>{
    return b.price-a.price;
})

var maxPrice=0;
for(var i=1;i<=p;i++){
    var currentPrice=[0,0,0];
    var currentWeight=[0,0,0];
    arr.forEach((item,index)=>{
        for(var j=1;j<=item.num;j++){
            for(var k=0;k<index;k++){
                if(currentWeight+item.weight<=i){
                    currentWeight[index]=j*item.weight+currentWeight[k];
                	currentPrice[index]=j*item.price+currentPrice[k];
                }else if(j*item.weight<i){
                    currentWeight[index]=j*item.weight;
                    currentPrice[index]=j*item.price;
                }
            }
        }
    })
    maxPrice=Math.max(...currentPrice,maxPrice);
}
// print(maxPrice);
console.log(maxPrice);
