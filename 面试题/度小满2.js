var n=readInt();
for(var p=0;p<n;p++){
    var line=read_line();
    var arr=[];
    var flag='Yes';
    for(var i=0;i<line.length;i+=3){
        arr.push(line.slice(i,i+3));
    }
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            var count=0;
            for(var k=0;k<3;k++){
                if(arr[i].charAt(k)===arr[j].charAt(k)){
                    count++;
                }
            }
            if(count<2){
                flag='No';
            }
        }
    }
}