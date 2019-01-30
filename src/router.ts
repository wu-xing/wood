import Vue from 'vue';
import Router from 'vue-router';
import About from './views/About.vue';

Vue.use(Router);

const SignIn = async () => await require('./views/SignIn.vue');
const SignUp = async () => await require('./views/SignUp.vue');
const Articles = async () => await require('./views/Articles.vue');
const ArticleEdit = async () => await require('./views/ArticleEdit.vue');
const ArticleCreate = async () => await require('./views/ArticleCreate.vue');
const Unauthorized = async () => await require('./views/Unauthorized.vue');
const ShareArticle = async () => await require('./views/ShareArticle.vue');
const HistoryArticle = async () => await require('./views/HistoryArticle.vue')

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
      path: '/h/:articleId/:date',
      name: 'history-article',
      component: HistoryArticle
    },
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/home',
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
    }
  ]
});
