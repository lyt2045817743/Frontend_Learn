<template>
    <div>
        <h1>这是我的vue页面！</h1>
        {{str}}
    </div>    
</template>
<script>
export default {
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
}
</script>
<style scoped>
    h1{
        color: red;
    }
</style>
