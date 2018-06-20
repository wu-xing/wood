import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: {}
  },
  mutations: {
    articles(state: any, payload: any) {
      const articles = {...state.articles}
      payload.forEach((article: any) => {
        articles[article.id] = article;
      });
      state.articles = articles;
    },
    article(state: any, payload: any) {
      state.articles[payload.id] = payload;
    }
  },
  actions: {
  }
})
