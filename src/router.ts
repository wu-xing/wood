import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Editor from './views/Editor.vue';

Vue.use(Router);

const SignIn = async () => await require('./views/SignIn.vue');
const SignUp = async () => await require('./views/SignUp.vue');
const Articles = async () => await require('./views/Articles.vue');
const ArticleEdit = async () => await require('./views/ArticleEdit.vue');
const ArticleCreate = async () => await require('./views/ArticleCreate.vue');
const Unauthorized = async () => await require('./views/Unauthorized.vue');
const ShareArticle = async () => await require('./views/shareArticle.vue');

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
      path: '/create',
      name: 'create',
      component: ArticleCreate
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleEdit
    },
    {
      path: '/p/:id',
      name: 'share-article',
      component: ShareArticle
    },
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/401',
      name: '401',
      component: Unauthorized
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
