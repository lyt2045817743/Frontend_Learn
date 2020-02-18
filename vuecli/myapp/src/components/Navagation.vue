<!--  -->
<template>
<div v-bind:class="['container',activeType]">
    <header>
        <span>首页</span>
        <p>{{$store.state.title[now_index]}}</p>
    </header>
    <nav>
        <ul>
            <li @click="goTvPlay">剧集</li>
            <li @click="goMusic">音乐</li>
            <li @click="goBook">书籍</li>
            <li @click="goTalk">聊天</li>
        </ul>
    </nav>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
data() {
return {
    activeType:"tv-play",
    now_index:0
}

},
methods: {
    goTvPlay(){
        this.$router.push('/');
        this.now_index=0;
        this.activeType='tv-play';
        sessionStorage.setItem('ActiveNav',this.activeType);
        sessionStorage.setItem('now_index',this.now_index);
    },
    goMusic(){
        this.$router.push('/music/Music.vue') ;
        this.activeType='music';
        this.now_index=1;
        sessionStorage.setItem('now_index',this.now_index);
        sessionStorage.setItem('ActiveNav',this.activeType);
    },
    goBook(){
        this.$router.push('/book/Book.vue');
        this.activeType='book';
        this.now_index=2;
        sessionStorage.setItem('now_index',this.now_index);
        sessionStorage.setItem('ActiveNav',this.activeType);
    },
    goTalk(){
        this.$router.push('/talk/Talk.vue');
        this.activeType='talk';
        this.now_index=3;
        sessionStorage.setItem('now_index',this.now_index);
        sessionStorage.setItem('ActiveNav',this.activeType);
    }
},
computed: {
    ...mapGetters(['now_title'])
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.activeType=sessionStorage.getItem('ActiveNav');
    this.now_index=sessionStorage.getItem('now_index');
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
    header,nav{
        height: 1rem;
        background-color: rgb(33, 150, 243);
        color: #333;
        position: fixed;
        width: 100%;
        z-index: 9999;
    }
    nav ul{
        display: flex;
        align-items: center;
        height: 1rem;
    }
    nav li{
        font-size: 0.5rem;
        flex-grow: 1;
        text-align: center;
    }
    header span{
        font-size: 0.3rem;
        position: absolute;
        left:10px;
        top:50%;
        transform: translateY(-50%);
    }
    header p{
        font-size: 0.7rem;
        text-align: center;
    }
    header{
        top: 0;
    }
    nav{
        bottom: 0;
    }
    header,
nav {
  height: 1rem;
  color: #333;
  position: fixed;
  width: 100%;
  left: 0;
}
header {
  top: 0;
}
nav {
  bottom: 0;
}
nav ul {
  display: flex;
  align-items: center;
  height: 1rem;
}
nav li {
  font-size: 0.5rem;
  flex-grow: 1;
  text-align: center;
}
header span {
  font-size: 0.3rem;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
header p {
  font-size: 0.7rem;
  text-align: center;
}

.tv-play header,.tv-play nav{
background-color: rgb(33, 150, 243);
}
.music header,.music nav{
background-color: rgb(0, 150, 136);
}
.book header,.book nav{
background-color: rgb(121, 85, 72);
}
.talk header,.talk nav{
background-color: rgb(63, 81, 181);
}
</style>