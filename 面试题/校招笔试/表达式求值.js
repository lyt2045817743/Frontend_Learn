// var n=4;
var numStack=[];
var quoteStack=[];
var opreStack=[];

function computer(opre,num1,num2){
    switch(opre){
        case '+':return num1+num2;
        case '-':return num1-num2;
        case '*':return num1*num2;
    }
}

// for(var i=0;i<n;i++){
    // var line=readline();
    var line='(+ 2 20)';
    for(var j=0;j<line.length;j++){
        var item=line.charAt(j,'item');
        // console.log(item);
        
        if(){
            numStack.push(item);
        }else if(item=='+'||item=='-'||item=='*'){
            opreStack.push(item);
        }else if(item=='('){
            quoteStack.push(item);
        }else if(item==')'&&quoteStack.length!==0&&opreStack.length!==0){
            quoteStack.pop();
            var result=computer(opreStack.pop(),numStack.pop(),numStack.pop());
            console.log(result);
        }else if(item==' '){
            continue;
        }else{
            console.log('invalid');
        }
        console.log(numStack,quoteStack,opreStack);
        
    }
// }