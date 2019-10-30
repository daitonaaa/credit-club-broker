import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  data: {
    entries: [],
    totalReward: null,
  },
  fetching: false,
  filters: {
    listFor: 'all',
    period: new Date(),
  },
});


const list = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.REWARD_LIST_SET_FILTER:
      return state.setIn(['filters', action.prop], action.value);

    case actionTypes.REWARD_LIST_SET:
      return state.set('data', {
        entries: action.entries,
        totalReward: action.totalReward,
      });

    case actionTypes.REWARD_LIST_SET_FETCHING_STATUS:
      return state.set('fetching', action.status);

    case actionTypes.REWARD_LIST_RESET:
      return state.merge({
        fetching: false,
        data: {
          entries: [],
          totalReward: null,
        },
      });

    default:
      return state;
  }
};


export default immutableize(list);
