import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import auth from './auth';
import main from './main';
import reward from './reward';
import workers from './workers';
import document from './document';
import uiMessages from './uiMessages';
import application from './application';

export const reducers = {
  user,
  auth,
  main,
  reward,
  workers,
  document,
  uiMessages,
  application,
};

const rootReducer = browserHistory =>
  combineReducers({
    ...reducers,
    router: connectRouter(browserHistory),
  });

export default rootReducer;
