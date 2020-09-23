var str='一千零一万五千四百三十二亿九千八百七十六万四千三百零二';
var arr1=str.split('亿');
var result=[];
for(var i=0;i<arr1.length;i++){
    var arr2=arr1[i].split('万');
    for(var j=0;j<arr2.length;j++){
        var strArr=arr2[j].split('');
        var computer=0;
        for(var k=strArr.length-1;k>0;k--){
            var ope=1;
            switch(strArr[k]){
                case '一':computer+=1*ope;break;
                case '二':computer+=2*ope;break;
                case '三':computer+=3*ope;break;
                case '四':computer+=4*ope;break;
                case '五':computer+=5*ope;break;
                case '六':computer+=6*ope;break;
                case '七':computer+=7*ope;break;
                case '八':computer+=8*ope;break;
                case '九':computer+=9*ope;break;
                case '零':ope=1;break;
                case '十':ope=10;break;
                case '百':ope=100;break;
                case '千':ope=1000;break;
            }
        }
        result.push(computer);
        
    }
}
console.log(result);

var resultStr="";
for(var i=0;i<result.length;i++){
    resultStr+=result[i];
}