import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  data: [],
  fetching: false,
  filters: {
    listFor: 'self',
    period: new Date(),
  },
});


const list = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.APPLICATION_LIST_SET_FILTER:
      return state.setIn(['filters', action.prop], action.value);

    case actionTypes.APPLICATION_LIST_SET:
      return state.set('data', action.applications);

    case actionTypes.APPLICATION_LIST_SET_FETCHING_STATUS:
      return state.set('fetching', action.status);

    case actionTypes.APPLICATION_LIST_RESET:
      return state.merge({
        data: [],
        fetching: false,
      });

    default:
      return state;
  }
};


export default immutableize(list);
