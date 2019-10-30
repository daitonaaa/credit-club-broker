import Immutable from 'immutable';

import { immutableize } from '@creditclub/helpers';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  messages: [],
});


const uiMessages = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.UI_MESSAGES_ADD_MESSAGE:
      return state.update('messages', list => list.push(action.event));

    case actionTypes.UI_MESSAGES_REMOVE_ONE: {
      const itemIndex = state.get('messages').findIndex(
        item => item.id === action.id
      );

      return state.deleteIn(['messages', itemIndex]);
    }

    case actionTypes.UI_MESSAGES_RESET:
      return initialState;

    default:
      return state;
  }
};


export default immutableize(uiMessages);
