import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Loading.module.scss';


const Loading = ({ min, max, white }) => (
  <div className={cx(styles.loading, {
    [styles.min]: min,
    [styles.max]: max,
    [styles.white]: white,
  })}>
    <div className={styles.ring}><div></div><div></div><div></div><div></div></div>
  </div>
);

Loading.propTypes = {
  min: PropTypes.bool,
  max: PropTypes.bool,
  white: PropTypes.bool,
};

export default Loading;
