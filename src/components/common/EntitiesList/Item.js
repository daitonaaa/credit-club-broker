import React from 'react';
import PropTypes from 'prop-types';

import styles from './EntitiesList.module.scss';


const Item = ({ rowItem, grTmplCol }) => (
  <div
    className={styles.item}
    style={{ gridTemplateColumns: grTmplCol }}
  >
    {
      rowItem
        .filter(c => c)
        .map((item, index) => (
          <div className={styles.col} key={index}>
            {item}
          </div>
        ))
    }
  </div>
);

Item.propTypes = {
  rowItem: PropTypes.array.isRequired,
  grTmplCol: PropTypes.string.isRequired,
};

export default Item;
