import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import './registerServiceWorker';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { setupAxiosAuth } from './util/axios'
import store from './store'

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue'


declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $eventHub: Vue
  }
}

// globally (in your main .js file)
Vue.component('as-icon', Icon)

Vue.prototype.$eventHub = new Vue();

setupAxiosAuth();

Vue.config.productionTip = true;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
