<!--  -->
<template>
<div>
    <div class="play-box">
        <aplayer 
            :music="music"
        />
    </div>
    <div>
        <ul class="music-list">
            <li>
                <div class="music-num">序号</div>
                <div class="music-title">歌曲名称</div>
                <div class="music-singer">歌手</div>
            </li>
            <li v-for="(item,index) in musicList" :key="item.id" @click="play(item.id)">
                <div class="music-num">{{index+1}}</div>
                <div class="music-title">{{item.name}}</div>
                <div class="music-singer">{{item.ar[0].name}}</div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import aplayer from 'vue-aplayer'
import axios from 'axios'
export default {
components:{
    aplayer
},
data() {
return {
    musicList:[],
    music:{
         title: "东西（Cover：林俊呈）",
            artist: "纳豆",
            src: "https://cdn.moefe.org/music/mp3/thing.mp3",
            pic: "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300"
        }
}
},
methods: {
    getData(){
        var url='https://bird.ioliu.cn/netease/playlist?id=3015005874';
        axios.get(url).then((res)=>{
             this.musicList=res.data.playlist.tracks;
        })
    },
    play(id){
        var url='https://bird.ioliu.cn/netease/song?id='+id;
        var musicObj={};
        axios.get(url).then((res)=>{
            musicObj={
                title: res.data.data.name,
                artist: res.data.data.ar[0].name,
                src: res.data.data.mp3.url,
                pic: res.data.data.al.picUrl
            }
            this.music=musicObj;            
        })
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getData();
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.music-list li{
    display: flex;
    font-size: 0.3rem;
}
.music-list li .music-num{
    flex: 1
}
.music-list li .music-title{
    flex: 3
}
.music-list li .music-singer{
    flex: 3;
}
.music-list li:nth-child(odd){
    background-color:  rgba(0, 150, 136,.5);
}
</style>