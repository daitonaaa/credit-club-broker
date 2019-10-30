import axios, { CancelToken } from 'axios';
import { REQUEST_VERSION } from 'constants/api';

const abortingXHR = {
  getApplications: undefined,
};

export default {

  getApplications(period, self) {
    if (abortingXHR.getApplications !== undefined) {
      abortingXHR.getApplications('Aborting with duplicate');
    }

    return axios.get(`/aggregation/broker/orders?period=${period}&self=${self}`, {
      cancelToken: new CancelToken((c) => abortingXHR.getApplications = c),
      headers: {
        [REQUEST_VERSION]: '1.1',
      }
    })
  },

  create: (form) => axios.post('/consumer/lead/broker', form, {
    headers: {
      [REQUEST_VERSION]: '1.1',
      'Content-type': 'application/json',
    },
  }),
};
