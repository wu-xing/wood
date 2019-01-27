import axios from 'axios';

export function getArticleBoxs(): Promise<ArticleBox[]> {
  return axios.get(`/api/auth/article-boxes`).then((resp: any) => {
    return resp.data;
  });
}
