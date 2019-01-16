import Vue from 'vue';
import Vuex from 'vuex';
import { getArticles, searchArticles } from './resouce/articles';
import { getArticleBoxs } from './resouce/article-box';

Vue.use(Vuex);

export default new Vuex.Store<any>({
  state: {
    articles: {},
    getArticlesLoading: false,
    searchStr: '',
    currentBoxId: '@DEFAULT',
    boxs: {
      '@ALL': {
        id: '@ALL',
        name: '全部笔记'
      },
      '@BOOK': {
        id: '@BOOK',
        name: '笔记本'
      },
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
    articles(state: any, { boxId, articles }) {
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
    currentBoxId(state: any, currentBoxId) {
      state.currentBoxId = currentBoxId;
    },
    searchStr(state: any, searchStr) {
      state.searchStr = searchStr;
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
    },
    searchArticles({commit}, {searchStr}) {
      commit('searchStr', searchStr);
      searchArticles(searchStr).then((articles: any) => {
        commit('articles', { boxId: '@SEARCH', articles });
      });
    }
  }
});
