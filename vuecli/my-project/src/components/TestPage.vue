<!--  -->
<template>
<div>
    <h1>测试页面{{ourname}}</h1>
    <button @click="changename1">changename</button>
    <button @click="changename2">changename2</button>

</div>
</template>

<script>
    export default {
    data() {
    return {}   

    },
    methods: {
        changename1(){
            this.$emit('update:ourname',"hello")
        },
        changename2(){
            this.$emit('changename2','小明')
        }
    },
//生命周期 - 创建完成（访问当前this实例）
created() {},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {}
}
</script>

<style scoped>
/* @import url(); 引入css类 */

</style>