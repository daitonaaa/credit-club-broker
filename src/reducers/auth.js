import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  username: '',
  password: '',
  errorText: '',
  success: false,
  fetching: false,
});


const auth = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.AUTH_SET_FIELD:
      return state.set(action.field, action.value);

    case actionTypes.AUTH_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(auth);
