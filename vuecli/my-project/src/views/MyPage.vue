<template>
    <div>
        <h1>这是我的vue页面！</h1>
        {{str}}
        <TestPage :ourname.sync="str" @changename2="channgeparentname"></TestPage>
    </div>    
</template>
<script>
import TestPage from '../components/TestPage'
export default {
    components:{
        TestPage
    },
    data(){
        return { 
            str:"fellow37"
        }
    },
    
    beforeRouteEnter (to, from, next) {
      console.log("进来之前");
      next()
    },
    beforeRouteLeave (to, from, next) {
      console.log("离开之前");
      next()
    },
    beforeUpdate(to,from,next) {
        console.log("路由修改");
        next()
    },
    methods: {
        channgeparentname(name){
            this.str=name
        }
    },
}
</script>
<style scoped>
    h1{
        color: red;
    }
</style>
