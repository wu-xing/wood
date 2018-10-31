import Vue from 'vue';
import Vuex from 'vuex';
import { getArticles } from './resouce/articles';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  state: {
    articles: {},
    boxs: {}
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
      }
    },
    article(state: any, payload: any) {
      state.articles[payload.id] = payload;
    },
    articleMidifiy(state: any, payload: any) {
      state.articles = {
        ...state.articles,
        [payload.id]: payload
      };
    }
  },
  actions: {
    getArticles({ commit }, { boxId, userId }) {
      getArticles(userId, boxId).then(
        (articles: Article[]) => {
          commit('articles', { boxId, userId, articles });
        },
        () => {}
      );
    }
  }
});
