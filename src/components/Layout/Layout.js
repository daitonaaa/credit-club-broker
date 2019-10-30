import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

import { addError } from 'actions/error';
import { initApp, resetApp, mainSetParameter } from 'actions/main';

import Loading from './Loading';
import Navigation from './Navigation';
import CriticalError from './CriticalError';
import UiMessages from 'components/UiMessages';

import styles from './Layout.module.scss';


class Layout extends Component {
  _isMounted = true;

  static propTypes = {
    route: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    userFetching: PropTypes.bool.isRequired,
    criticalError: PropTypes.bool.isRequired,

    initApp: PropTypes.func.isRequired,
    resetApp: PropTypes.func.isRequired,
    addError: PropTypes.func.isRequired,
    mainSetParameter: PropTypes.func.isRequired,
  };

  state = {
    show: false,
  };

  componentDidMount() {
    const { initApp } = this.props;

    initApp();
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({ show: true });
      }
    }, 15);
  }

  componentDidCatch(error, errorInfo) {
    const { addError, mainSetParameter } = this.props;

    if (this._isMounted) {
      mainSetParameter('criticalError', true);
    }

    addError({
      err: {
        origin: error,
        extra: { ...errorInfo },
      }
    });
  }

  componentWillUnmount() {
    const { resetApp } = this.props;

    this._isMounted = false;
    resetApp();
  }

  render() {
    const { route, userFetching, criticalError } = this.props;
    const { show } = this.state;

    return criticalError ? (
      <CriticalError />
    ) : (
      <div className={cx(styles.main, {
        [styles.show]: show,
      })}>
        <UiMessages />
        <Navigation />
        <div className={styles.content}>
          {
            userFetching
              ? <Loading />
              : renderRoutes(route.routes)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userFetching: state.user.fetching,
  criticalError: state.main.criticalError,
});

const mapDispatchToProps = {
  initApp,
  resetApp,
  addError,
  mainSetParameter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
