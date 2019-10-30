import React from 'react';
import Root from './Root';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { initApp } from 'actions/main';
import { updateToken } from 'actions/auth';
import * as serviceWorker from '../serviceWorker';
import configureStore from './configureStore';
import { createBrowserHistory } from 'history';
import { ConfigureAxios } from '@creditclub/helpers';

import scriptsInit from './scripts';


import { sentryConfig } from './sentryConfig';
import * as Sentry from '@sentry/browser';

import '../scss/normalize.css';
import '../scss/iconic-fonts.scss';
import '../scss/common.scss';

const initialState = window.__INITIAL_STATE__ || {};
const browserHistory = createBrowserHistory();

export const store = configureStore(initialState, browserHistory);

const configureAxios = new ConfigureAxios({
  // mockMode: true,
  // debug: true,
  updateTokenFn: updateToken,
  userReceivingTokenAfterFail: initApp,
});

configureAxios.init(axios, store);
Sentry.init(sentryConfig);
scriptsInit();

ReactDOM.hydrate(
  <Root {...{ store, browserHistory }} />,
  document.getElementById('root') || document.createElement('div')
);

serviceWorker.register();
