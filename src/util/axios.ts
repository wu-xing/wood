import axios from 'axios';
import router from '../router';
import { readJwt } from './auth';

export function setupAxiosAuth() {
  axios.defaults.headers.common['App-Authorization'] = 'Bearer ' + window.localStorage.getItem('jwt');
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    error => {
      const ignore = /\/api\/v2\/signin$/.test(error.request.responseURL);
      if (error.response && error.response.status === 401 && !ignore) {
        router.push('/401');
      }
      throw error;
    }
  );
}
