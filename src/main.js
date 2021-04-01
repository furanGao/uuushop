// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/rest.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import gCom from './comnon'

Vue.prototype.$imgUrl = 'http://localhost:3010'

for (let i in gCom){
  Vue.component(i,gCom[i])
}

let echarts = require('echarts')
Vue.prototype.$echart = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
