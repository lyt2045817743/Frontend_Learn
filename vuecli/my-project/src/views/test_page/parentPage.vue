<!--  -->
<template>
  <div>
    <h1>父页面</h1>
    <div>
        <router-link to="/parentpage/child1/小明">子路由一</router-link>
         | <router-link :to="{name:'child2',params:{age:30}}">子路由二</router-link>
    </div>
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>