import React from 'react';

import { Flicker } from '@creditclub/react-components';

import styles from './Styles.module.scss';

const Loading = () => (
  <div className={styles.wrapper}>
    <div className={styles.item}>
      <Flicker className={styles.flicker} />
      <Flicker className={styles.flicker} />
      <Flicker className={styles.flicker} />
    </div>
    <div className={styles.item}>
      <Flicker className={styles.flicker} />
      <Flicker className={styles.flicker} />
      <Flicker className={styles.flicker} />
    </div>
  </div>
);

export default Loading;
