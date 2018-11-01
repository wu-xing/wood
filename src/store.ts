import Vue from 'vue';
import Vuex from 'vuex';
import { getArticles } from './resouce/articles';
import { getArticleBoxs } from './resouce/article-box';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  state: {
    articles: {},
    getArticlesLoading: false,
    boxs: {
      '@DEFAULT': {
        id: '@DEFAULT',
        name: '默认'
      },
      '@SEARCH': {
        id: '@SEARCH',
        name: '搜索'
      }
    }
  },
  mutations: {
    articles(state: any, { boxId, userId, articles }) {
      const stateArticles = { ...state.articles };

      articles.forEach((article: any) => {
        stateArticles[article.id] = article;
      });

      state.articles = stateArticles;
      state.boxs = {
        ...state.boxs,
        [boxId]: {
          ...state.boxs[boxId],
          articleIds: articles.map((a: any) => a.id)
        }
      };
    },
    getArticlesLoading(state: any, payload: any) {
      state.getArticlesLoading = payload;
    },
    article(state: any, payload: any) {
      state.articles[payload.id] = payload;
    },
    articleMidifiy(state: any, payload: any) {
      state.articles = {
        ...state.articles,
        [payload.id]: payload
      };
    },
    articleBoxs(state: any, articleBoxs: ArticleBox[]) {
      state.boxs = {
        ...state.boxs,
        ...articleBoxs.reduce((collection: any, box: ArticleBox) => {
          return {
            ...collection,
            [box.id]: box
          }
        }, {})
      };
    }
  },
  actions: {
    getArticleBoxs({ commit }) {
      getArticleBoxs().then((boxs: ArticleBox[]) => {
        commit('articleBoxs', boxs);
      });
    },
    getArticles({ commit }, { boxId, userId }) {
      commit('getArticlesLoading', true);
      getArticles(userId, boxId).then(
        (articles: Article[]) => {
          commit('articles', { boxId, userId, articles });
          commit('getArticlesLoading', false);
        },
        () => {
          commit('getArticlesLoading', false);
        }
      );
    }
  }
});
