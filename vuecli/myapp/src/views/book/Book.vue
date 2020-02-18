<!--  -->
<template>
  <div v-loading.fullscreen="loading" element-loading-text="加载中...">
    <div class="slider-box">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in sliderList" :key="index">
          <img class="slider-img" :src="'https://images.weserv.nl/?url='+item.cover.url" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="book-tab">
        <el-tabs v-model="activeName" type="card" :stretch="true" @tab-click="getData">
            <el-tab-pane label="虚拟类" name="fiction"></el-tab-pane>
            <el-tab-pane label="非虚拟类" name="nonfiction"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="book-list">
      <el-row :gutter="24" v-for="(item,index) in bookList" :key="index">
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <img  class="slider-img" :src="'https://images.weserv.nl/?url='+item.cover.url" alt="">
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
              <div class="book-nav">
                    <p class="book-title">{{item.title}}</p>
                    <p class="book-info">{{item.info}}</p>
                    <p class="book-star">
                        <el-rate
                            :value="getStar(item.rating.value)"
                            disabled
                            show-score
                            text-color="#ff9900">
                        </el-rate>    
                    </p>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sliderList: [],
      bookList: [],
      activeName: 'fiction',
      loading:true
    };
  },
  methods: {
    getStar(star){
        star=(star/2)*10;
        star=Math.trunc(star)/10;
        return star;        
    },
    getData() {
      let birdUrl = "https://bird.ioliu.cn/v2?url=";
      let requestUrl =
        `https://m.douban.com/rexxar/api/v2/subject_collection/book_${this.activeName}/items?start=0&count=10`;
      axios.get(birdUrl + requestUrl).then((res) => {
        this.sliderList = res.data.subject_collection_items.slice(0, 6);
        this.bookList = res.data.subject_collection_items;
        this.loading=false;
      });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.slider-img {
  width: 100%;
}
.book-list .book-title{
    font-size: 0.5rem;
}
.book-list .book-info{
    font-size: 0.3rem;
}
</style>