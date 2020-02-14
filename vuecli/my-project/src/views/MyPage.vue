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
    
}
</script>
<style scoped>
    h1{
        color: red;
    }
</style>
