import logger from 'redux-logger';
import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'connected-react-router';

const isProductionBuild = process.env.NODE_ENV === 'production';

const getMiddlewares = (browserHistory) => {
  if (isProductionBuild) return applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware
  );

  return applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware,
    logger,
  );
};

// Формируем главное хранилище
export default function configureStore(initialState, browserHistory) {
  return createStore(
    rootReducer(browserHistory),
    initialState,
    getMiddlewares(browserHistory),
  );
}
