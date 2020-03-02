import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.withCredentials=true;
axios.defaults.crossDomain=true;
axios.defaults.baseURL="http://192.168.14.9:3000";
Vue.prototype.axios=axios;
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
