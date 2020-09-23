function Solution(S) {
    let arr=S.split('');
    let change=true;
    while(change){
        change=false;
        for(let i=0;i<arr.length;i++){
            if(arr[i]=='L'){
                if(i-1>-1 && arr[i-1]=='.'){
                    if(i-2>-1){
                        if(arr[i-2]!='R'){
                            arr[i-1]='L';
                            change=true;
                            console.log(arr[i-1],"i-1");
                            
                        }
                    }else{
                        arr[i-1]='L';
                        change=true;
                    }
                }
            }else if(arr[i]=='R'){
                if(i+1<arr.length&&arr[i+1]=='.'){
                    if(i+2<arr.length){
                        if(arr[i+2]!='L'){
                            arr[i+1]='R';
                            change=true;
                            i++;
                        }
                    }else{
                        arr[i+1]='R';
                        change=true;
                    }
                }
            }
        }
    }
    return arr.join('');
}

console.log(Solution('RR.L'));
