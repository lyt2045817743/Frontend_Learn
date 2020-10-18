function bindEvent(ele,type,selector,fn){
    if(fn === undefined){
        fn = selector;
        selector = null;
    }
    if(selector){
        ele.addEventListener(type, function(event){
            if(event.target.matches(selector)){
                fn.call(event.target,event);
            }
        })
    }else{
        ele.addEventListener(type,fn.bind(ele,event))
    }
}
const btn=document.getElementById('btn');
bindEvent(btn, 'click',function(){
    console.log(this.nodeName);
})

const div = document.getElementsByTagName('div')[0];
bindEvent(div, 'click', 'a', function(){
    console.log(this.href);
})