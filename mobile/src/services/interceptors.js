import api from './api';
import { signOut } from '~/store/modules/auth/actions';

export function session(dispach) {
  api.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
      dispach(signOut());
    }
  });
}
