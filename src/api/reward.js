import axios, { CancelToken } from 'axios';
import { REQUEST_VERSION } from 'constants/api';

const abortingXHR = {
  getReward: undefined,
};


export default {

  getReward(options) {
    const { self, startDate, endDate } = options;

    if (abortingXHR.getReward !== undefined) {
      abortingXHR.getReward('Aborting with duplicate');
    }

    return axios.get(`/worker/broker/reward?startDate=${startDate}&endDate=${endDate}&self=${self}`, {
      cancelToken: new CancelToken((c) => abortingXHR.getReward = c),
      headers: {
        [REQUEST_VERSION]: '1.1',
      }
    })
  },
};
