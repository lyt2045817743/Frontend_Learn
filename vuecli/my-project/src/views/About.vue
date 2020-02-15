<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!--<h1>vuex-count:{{$store.state.count}}</h1>
    <h1>getters-count:{{$store.getters.newCount}}</h1>
    <button @click="$store.commit('add')">add</button>
    <button @click="$store.commit('reduce')">reduce</button>-->

    <h1>用户名：{{$store.state.user.username}}</h1>
    <h1>vuex-count:{{count}}</h1>
    <h1>getters-count:{{newCount}}</h1>
    <button @click="add">add</button>
    <button @click="reduce">reduce</button>
    <button @click="addActive">addActive</button>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
export default {
  methods: {
    ...mapActions(['addActive']),
    ...mapMutations(['add','reduce'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['newCount'])

  },
}
</script>