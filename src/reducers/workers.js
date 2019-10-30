import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  data: [],
  fetching: false,
});


const workers = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.WORKERS_SET_DATA:
      return state.set('data', action.workers);

    case actionTypes.WORKERS_SET_FETCHING_STATUS:
      return state.set('fetching', action.status);

    case actionTypes.WORKERS_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(workers);
