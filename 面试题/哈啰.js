function fun(n,o){
    console.log(o);
    return {
        fun:function(m){
            return fun(m,n);
        }
    }
}
a=fun(0).fun(1);a.fun(2);a.fun(3);
fun(0).fun(1).fun(2).fun(3);
c=fun(0);c.fun(1);c.fun(2);c.fun(3);