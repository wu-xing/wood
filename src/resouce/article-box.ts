import axios from 'axios';

export function getArticleBoxs(): Promise<ArticleBox[]> {
  return axios.get(`/api/auth/article-box`).then((resp: any) => {
    return resp.data;
  });
}
