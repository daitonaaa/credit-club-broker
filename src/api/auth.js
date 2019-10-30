import axios from 'axios';
import AUTH from 'constants/auth';
import { token } from '@creditclub/helpers';

export default {

  getToken: (username, password) => axios({
    method: 'POST',
    url: 'uaa/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${AUTH.BASE64}`,
    },
    $$noInterceptors: true,
    transformRequest: () => `grant_type=password&username=${username + AUTH.PREFIX}&password=${password}`,
  }),

  updateToken: () => axios({
    method: 'POST',
    url: '/uaa/oauth/token',
    transformRequest: () => `grant_type=refresh_token&refresh_token=${token.get().refreshToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${AUTH.BASE64}`,
    },
    $$noInterceptors: true,
  }),

};
