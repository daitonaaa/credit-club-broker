import cx from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getPageTitle } from 'helpers';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import Form from './Form';

import styles from  './Login.module.scss';


const Login = ({ success }) => (
  <Fragment>
    <Helmet title={getPageTitle('Вход')} />
    <div className={cx(styles.wrapper, {
      [styles.success]: success,
    })}>
      <div className={styles.content}>
        <div className={styles.top}>
          <img src="https://credit.club/files/credit-club-logo-white.svg" alt="credit.club" />
        </div>
        <div className={styles.body}>
          <Form />
        </div>
        <div className={styles.bottom}>
          <span>© 2019, Credit.club</span>
          <span>8 800 775 80 09</span>
        </div>
      </div>
    </div>
  </Fragment>
);

Login.propTypes = {
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.auth,
});

export default connect(mapStateToProps)(Login);
