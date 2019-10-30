import axios from 'axios';
import { REQUEST_VERSION } from 'constants/api';


export default {

  getWorkers: (brokerId, orgId) => (
    axios.get(`/worker/broker/organization/brokers?broker=${brokerId}&orgId=${orgId}`, {
      headers: {
        [REQUEST_VERSION]: '1.1',
      }
    })
  )
};
