function validBraces(str){
    var first=-1;
    var arr=str.split('');
    var stack1=[];
    var stack2=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]==='['||arr[i]==='{'||arr[i]==='('){
            stack1.push(arr[i]);
        }
        else{
            stack2.unshift(arr[i]);
        }
    }
   while(stack1.length>0){
    console.log(stack1,stack2);
    var left=stack1[stack1.length-1];
    var right=stack2.shift();
       if((left==='('&&right===')')||(left==='['&&right===']')||(left==='{'&&right==='}')){
        console.log(stack1,stack2);
        stack1.pop();
        continue;
       }
       else{
           break;
       }
    
   }
   console.log(stack1);
   
   first=stack1.length-1;

    console.log(first);

    
    // return first;
}

validBraces('[(])')