import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  criticalError: false,
  isAppInit: false,
});


const main = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.MAIN_SET_FIELD:
      return state.set(action.prop, action.value);

    case actionTypes.MAIN_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(main);
