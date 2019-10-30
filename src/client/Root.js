import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';

import routes from 'routes/routes';

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    browserHistory: PropTypes.object.isRequired,
  };

  render() {
    const { store, browserHistory } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(Root);
