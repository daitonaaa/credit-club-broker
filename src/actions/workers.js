import api from 'api';
import * as actionTypes from 'constants/actionTypes';

import { isEmpty } from 'ramda';
import { addError } from 'actions/error';


const setData = (workers) => ({
  type: actionTypes.WORKERS_SET_DATA,
  workers,
});


const setFetchingStatus = (status) => ({
  type: actionTypes.WORKERS_SET_FETCHING_STATUS,
  status,
});


export const resetWorkers = () => ({
  type: actionTypes.WORKERS_RESET,
});


export const getWorkers = () => (dispatch, getState) => {
  const user = getState().user.data;

  if (isEmpty(user)) {
    return;
  }

  dispatch(setFetchingStatus(true));

  return api.workers.getWorkers(user.id, user.organization.id)
    .then(({ data }) => {
      dispatch(setData(data));
      dispatch(setFetchingStatus(false));
    })
    .catch((err) => {
      dispatch(setFetchingStatus(false));

      dispatch(addError({
        err: {
          origin: err,
          extra: {
            actionMethod: 'getWorkers',
          },
        },
      }));
    })
};
