<!--  -->
<template>
<div>
    <div class="talk-info">
            <ul class="scroll-ul">
                <li v-for="(mes,index) in mesList" :key="index">{{mes}}</li>
            </ul>
    </div>
    <div class="talk-box">
        <input type="text" placeholder="请输入聊天内容" v-model="inpVal" v-on:keyup.13="sendMes">
        <button @click="sendMes">发送</button>
    </div>
</div>
</template>

<script>
import axios from "axios";
import md5 from 'md5'
export default {
data() {
return {
    inpVal:"",
    mesList:[],
}
},
methods: {
    getTimeStamp(){
        var timer=new Date();
        timer=Date.parse(timer)/1000;
        return timer;
        
    },
    getNonceStr(){
        var str=Math.random().toString(16).substr(2);
        return str;        
    },
    getSign(params){
        var arr=Object.keys(params).sort();
        var str="";
        for(var i=0;i<arr.length;i++){
            str+=`${arr[i]}=${encodeURI(params[arr[i]])}&`
        }        
        str+='app_key=v6xKDnuUrtNZnRrM';
        str=md5(str).toUpperCase();
        return str;        

    },
    sendMes(){
        var inpVal=this.inpVal;
        this.mesList.push(inpVal);
        this.inpVal="";
        var params={
            app_id:2128712439,
            time_stamp:this.getTimeStamp(),
            nonce_str:this.getNonceStr(),
            session:"10001",
            question:inpVal
        }
        var sign=this.getSign(params);
        params.sign=sign;

        var chatUrl='https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat';
        var birdUrl="https://bird.ioliu.cn/v2?url=";
        axios.get(birdUrl+chatUrl,{
            params
        }).then((res)=>{
            this.mesList.push(res.data.data.answer);
            var scroll=document.getElementsByClassName('scroll-ul')[0];
            var clientH=scroll.clientHeight;
            setTimeout(function(){
                if(scroll.scrollHeight>scroll.scrollTop){
                    scroll.scrollTop=scroll.scrollHeight-clientH;
                }
            },10)
           

        })
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.talk-box{
    position: fixed;
    bottom: 1rem;
    height: 1rem;
    line-height: 0.8rem;
    text-align: center;
    width: 100%;
    padding: 0 0 10px 0;
}
.talk-box input{
    width: 5.8rem;
    height: 0.8rem;
    margin-right: 5px;
}
.talk-box button{
    height: 0.8rem;
    background-color: rgba(63, 81, 181,.5)
}
/* .talk-info{
} */
.talk-info ul{
    margin: 0 auto;
    font-size: 0.5rem;
    height: 10rem;
    overflow:scroll;
}
.talk-info ul li{
    width: 4rem;
    border-radius: 0.3rem;
    margin:5px 5px;
}
.talk-info ul li:nth-child(odd){
    background-color: rgb(81, 167, 238);
    float: right;
}
.talk-info ul li:nth-child(even){
    background-color:rgb(133, 207, 139);
    float: left;
}
</style>