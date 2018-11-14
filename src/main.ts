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

import AddButton from './components/AddButton.vue';


import './element-variables.scss';

declare module 'vue/types/vue' {
  interface Vue {
    $eventHub: Vue
  }
}

Vue.component('as-icon', Icon)
Vue.component('add-button', AddButton)

Vue.prototype.$eventHub = new Vue();

setupAxiosAuth();

Vue.config.productionTip = true;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
