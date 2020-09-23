function calculate( str ) {
    // write code here
    var arr1=str.split('加');
    var arr2=[];
    for(var i=0;i<arr1.length;i++){
        arr2.push(arr1[i].split(''));
    }
    var result=[];
    for(var i=0;i<arr2.length;i++){
        result[i]=0;
        for(var j=0;j<arr2[i].length;j++){
            var num1;
            var num2;
            var ope;
            var current;
            switch(arr2[i][j]){
                case '壹':num2=1;current=1;break;
                case '贰':num2=2;current=1;break;
                case '叁':num2=3;current=1;break;
                case '肆':num2=4;current=1;break;
                case '伍':num2=5;current=1;break;
                case '陆':num2=6;current=1;break;
                case '柒':num2=7;current=1;break;
                case '捌':num2=8;current=1;break;
                case '玖':num2=9;current=1;break;
                case '零':num2=0;current=1;break;
                case '减':ope=-1;current=0;break;
                case '拾':ope=10;current=0;break;
            }
            // console.log(ope);
            
            if(ope===undefined){
                num1=num2;
            }else if(current===1){
                num1=num1+num2;
            }else{
                num1=num1*ope;
            }

            
        }
        result[i]=num1;
    }   
    console.log(result);
     
}
var str="玖拾玖加捌拾捌减柒拾柒加壹拾减壹拾陆加零";
calculate(str);