import axios from 'axios';
import router from '../router';
import { readJwt } from './auth';

export function setupAxiosAuth() {
  axios.defaults.headers.common['jwt'] = window.localStorage.getItem('jwt');
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        router.push('/401');
      }
      return error;
    }
  );
}
