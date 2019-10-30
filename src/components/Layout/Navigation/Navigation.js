import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Person } from '@creditclub/helpers';
import { Flicker } from '@creditclub/react-components';

import url from 'routes/urls';

import { push } from "connected-react-router";
import { logout } from 'actions/auth';

import logo from 'images/logo.svg';
import logoutImg from 'images/logout.svg';

import Burger from './Burger';

import styles from './Styles.module.scss';


const getNavsList = (user) => {
  if (user.accessRights) {
    return [
      {
        key: 'applications',
        title: 'Мои заявки',
        path: url.application.path,
        haveRights: user.accessRights.hasPermission(user.accessRights.ps.ORDERS_BROKER_VIEW_SELF_ORDERS),
      },
      {
        key: 'reward',
        title: 'Вознаграждения',
        path: url.reward.path,
        haveRights: user.accessRights.hasPermission(user.accessRights.ps.WORKER_VIEW_REWARD),
      },
    ];
  }

  return [];
};


const Navigation = ({ user, fetching, push, logout }) => {
  const onChangeNav = (nav) => {
    push(nav.path);
  };

  const renderLoading = () => (
    <div className={styles.loading}>
      <Flicker />
      <Flicker />
      <Flicker />
      <Flicker />
    </div>
  );

  const burgerProps = {
    user,
    navs: getNavsList(user),
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.logo}
        onClick={() => push('/')}
        title={process.env.APP_VERSION}
      >
        <img src={logo} alt="credit.club logo"/>
      </div>
      {
        fetching ? (
          renderLoading()
        ) : (
          <>
            <div className={styles.navs}>
              {
                getNavsList(user).map((nav) => (
                  nav.haveRights && (
                    <div
                      key={nav.key}
                      onClick={() => onChangeNav(nav)}
                      className={cx(styles.nav, {
                        [styles.navActive]: nav.path === window.location.pathname,
                      })}
                    >
                      <div>{nav.title}</div>
                    </div>
                  )
                ))
              }
            </div>
            <div className={styles.right}>
              <div>{Person.getFullName(user, true)}</div>
              <div className={styles.logout} onClick={logout}>
                <img src={logoutImg} alt=""/>
              </div>
            </div>
            <Burger {...burgerProps} />
          </>
        )
      }
    </div>
  )
};

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,

  push: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  fetching: state.user.fetching,
});

const mapDispatchToProps = {
  push,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
