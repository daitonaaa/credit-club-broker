import axios from 'axios';

export default {

  getTemporaryUrls: (filesNames) => {
    let queryParams = '';

    filesNames.forEach((item, i) => {
      queryParams += `${i === 0 ? '?' : '&'}filename=${item}`
    });

    return axios.get(`/document/url${queryParams}`);
  },

  sendFile: (url, file, mimeType, callbackfn) => axios({
    url,
    data: file,
    method: 'PUT',
    $$noInterceptors: true,
    onUploadProgress: callbackfn,
    headers: {
      'Content-Type': mimeType || 'application/octet-stream',
    }
  }),
};
