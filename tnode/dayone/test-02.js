for(var i=0;i<10;i++){
    exec(i,function(item){
        console.log(item);
        
    })
}
function exec(param,callback){
    setTimeout(function(){
        callback(param)
    },0)
}