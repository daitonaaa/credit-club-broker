import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';
import { UserAccessRights } from 'helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  data: {
    accessRights: new UserAccessRights({})
  },
  fetching: true,
});


const user = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.USER_SET_FIELD:
      return state.set(action.field, action.value);

    case actionTypes.USER_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(user);
