// while(line=read_line()!=''){
    // var [n,m]=line.split(' ');
    // n=parseInt(can);
    // m=parseInt(m)*100;
    var n=60;
    var m=100;
    var day=1;
    while(m>0){
        var back=0;
        if(m-n<0){
            break;
        }
        else{
            for(var i=1;i<=day;i++){
                back+=n/(i*2);
            }
            m=m-n+back;
            console.log(m);
            day++;
        }
    }
    console.log(day);
    
    // print(day);
// }