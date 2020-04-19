import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import iView from 'view-design'//练习view ui加 (全局引入时)
import 'view-design/dist/styles/iview.css'//练习view ui加


Vue.config.productionTip = false
// Vue.use(iView);//练习view ui加(全局引入时)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
