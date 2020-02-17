<!--  -->
<template>
<div>
    <ul class="tv-show">
        <li class="clearfix" v-for="items in dataList" :key="items.id" @click="goDetail(items.id)">
            <div class="left">
                <img :src="items.cover.url" alt="">
            </div>
            <div class="right">
                <p class="title">{{items.title}}</p>
                <p class="info">{{items.info}}</p>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import axios from "axios";
export default {
data() {
return {
    dataList:[],
    start:0,
    isContinue:true,
    total:1
}
},
methods: {
    scroll(){

        var doc=document.documentElement;
        window.onscroll=()=>{
            var scrollHeight=doc.scrollHeight;
            var clientHeight=doc.clientHeight;
            var scrollTop=doc.scrollTop;
            if(scrollTop+clientHeight+10>=scrollHeight){
                this.getData();
            }
        }
        

    },
    getData() {
      //跨域
      //浏览器通源策略 
      let requestUrl =
        `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=${this.start}&count=10`;
      let birdUrl = "https://bird.ioliu.cn/v2?url="
      if(this.isContinue && this.total>this.start){
        this.isContinue=false;
        axios
        .get(birdUrl+requestUrl)
        .then((res) => {
            this.dataList=[...(this.dataList),...(res.data.subject_collection_items)];
            this.start+=10;
            this.isContinue=true;
            this.total=res.data.total;
        })
      }
      
    },
    goDetail(id){
        this.$router.push('./detail/'+id);
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.getData();
    this.scroll();
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
    .tv-show{
        width: 90%;
        margin: 0 auto;
    }
    .tv-show li{
        padding: 20px 10px 10px 20px;
        border-bottom: 1px solid #999; 
    }
    .tv-show li .left{
        width: 40%;
        float: left;
    }
    .tv-show .left img{
        width: 85%;
    }
    .tv-show li .right{
        width: 60%;
        float: left;
    }
    .tv-show .right .title{
        font-size: 25px;
    }
    .tv-show .right .info{
        font-size: 10px;
    }
</style>