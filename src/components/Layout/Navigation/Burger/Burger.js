import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logout } from "actions/auth";
import { push } from "connected-react-router";
import React, { useState, useEffect, useCallback } from 'react';

import { Person } from '@creditclub/helpers';
import logoWhiteImg from 'images/logo-white.svg';

import styles from './Styles.module.scss';


const Burger = ({ navs, user, logout, push }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const onShow = (status) => {
    const classListMethod = status ? 'add' : 'remove';

    document.body.classList[classListMethod]('overflow-hidden');
    setShowMenu(status);
  };

  const handleCheckSizeWindow = useCallback(
    () => {
      const isMobileWidth = getPageWidth() <= 900;

      setShowComponent(isMobileWidth);

      if (!isMobileWidth) onShow(false);
    },
    []
  );

  useEffect(() => {
    handleCheckSizeWindow();
    window.addEventListener('resize', handleCheckSizeWindow);

    return () => {
      window.removeEventListener('resize', handleCheckSizeWindow);
    };
  }, [handleCheckSizeWindow]);

  const handleChangeTab = (nav) => {
    onShow(false);
    push(nav.path);
  };

  const getPageWidth = () => window.innerWidth || document.body.clientWidth;

  return showComponent ? (
    <>
      <div
        onClick={() => onShow(!showMenu)}
        className={cx(styles.toggle, {
          [styles.toggleShow]: showMenu
        })}
      >
        <div/><div/><div/>
      </div>
      <div className={cx(styles.wrapper, {
        [styles.show]: showMenu,
      })}>
        <div className={styles.info}>
          <img src={logoWhiteImg} alt=""/>
          <span>{Person.getFullName(user, true)}</span>
        </div>
        <div className={styles.menu}>
          {
            navs.map((nav) => (
              nav.haveRights && (
                <div
                  key={nav.key}
                  onClick={() => handleChangeTab(nav)}
                  className={cx(styles.menuItem, {
                    [styles.menuItemActive]: nav.path === window.location.pathname,
                  })}
                >
                  {nav.title}
                </div>
              )
            ))
          }
        </div>
        <div
          onClick={logout}
          className={styles.logout}
        >
          <span>Выйти</span>
        </div>
      </div>
    </>
  ) : null;
};

Burger.propTypes = {
  navs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,

  push: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  push,
  logout,
};

export default connect(null, mapDispatchToProps)(Burger);
