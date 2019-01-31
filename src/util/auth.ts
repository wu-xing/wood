import axios from 'axios';
import { setupAxiosAuth } from './axios';

export function setJwt(jwt: string) {
  window.localStorage.setItem('jwt', jwt);
  setupAxiosAuth();
}

export function readJwt() {
  return window.localStorage.getItem('jwt');
}

export function setUserId(userId: string): void {
  window.localStorage.setItem('userId', userId.toString());
}

export function readUserId(): string {
  return window.localStorage.getItem('userId')!;
}
