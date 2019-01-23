import axios from 'axios';

function getArticlesByArticleBoxId(userId: string, boxId: string): Promise<any> {
  return Promise.resolve({})
}

function getUserDefaultArticles(userId: string): Promise<Article[]> {
  return axios.get(`/api/auth/v2/articles?userId=${userId}`).then(
    resp => {
      return resp.data;
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
