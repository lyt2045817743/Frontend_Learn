const inp = document.getElementById('inp');
inp.oninput = debounce(function(){
    console.log(this.value);
},1000);

function debounce(fn,delay=500){
    let timer = null;
    return function(){
        if(timer){
            clearInterval(timer);
        }
        timer = setTimeout(()=>{
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
}