import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import { ImagePreview } from "vant";
import { List } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';

Vue.use(IndexBar).use(IndexAnchor);
Vue.use(List);
Vue.use(ImagePreview);
Vue.use(Vant);
Vue.prototype.axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
