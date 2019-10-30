import axios from 'axios';

export default {

  getUser: () => axios.get('/worker/current'),

  getUserPermissions: () => axios.get('/uaa/users/current'),
};
