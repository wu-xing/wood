import axios from 'axios';

function getArticlesByArticleBoxId(userId: string, boxId: string): Promise<any> {
  return Promise.resolve({})
}

function getUserDefaultArticles(userId: string): Promise<Article[]> {
  return axios.get(`/api/auth/articles?userId=${userId}`).then(
    resp => {
      return resp.data;
      // this.$store.commit('articles', resp.data);

      // if (!this.foucsedArticleId && this.articles[0]) {
      //   this.foucsedArticleId = this.articles[0].id;
      // }
      // this.loading = true;
    },
  );
}

export function getArticles(userId: string, boxId: string) {
  if (boxId !== '@DEFAULT') {
    return getArticlesByArticleBoxId(userId, boxId);
  }
  return getUserDefaultArticles(userId);
}

export function searchArticles(searchStr: string) {
  return axios.get(`/api/auth/articles/search/${searchStr}`).then(resp => resp.data.items);
}
