import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Editor from './views/Editor.vue';

Vue.use(Router);

const SignIn = async () => await require('./views/SignIn.vue');
const SignUp = async () => await require('./views/SignUp.vue');
const Articles = async () => await require('./views/Articles.vue');
const ArticleEditor = async () => await require('./views/ArticleEditor.vue');



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },

    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/401',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
});
