import cx from 'classnames';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Item from './Item';
import { Loading } from '@creditclub/react-components';

import styles from './EntitiesList.module.scss';


const EntitiesList = (props) => {
  const {
    fetching,
    rowData,
    columnNames,
    wrapperClassName,
    gridTemplateColumns,
  } = props;

  const grTmplCol = (gridTemplateColumns || new Array(columnNames.length)
    .fill(1))
    .join('fr ') + 'fr';

  return (
    <div className={cx(styles.wrapper, {
      [wrapperClassName]: wrapperClassName,
    })}>
      {
        fetching ? (
          <Loading />
        ) : (
          !rowData || isEmpty(rowData) ? (
            <div className='empty-list'>
              Список пуст
            </div>
          ) : (
            <Fragment>
              <div
                className={styles.head}
                style={{ gridTemplateColumns: grTmplCol }}
              >
                {
                  columnNames
                    .filter(c => c)
                    .map((item, i) => (
                      <div className={styles.col} key={i}>
                        {item}
                      </div>
                    ))
                }
              </div>
              <div className={styles.list}>
                {
                  rowData.map((item, index) => (
                    <Item
                      key={index}
                      rowItem={item}
                      grTmplCol={grTmplCol}
                    />
                  ))
                }
              </div>
            </Fragment>
          )
        )
      }
    </div>
  )
};

EntitiesList.propTypes = {
  fetching: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  rowData: PropTypes.array.isRequired,
  gridTemplateColumns: PropTypes.array,
  columnNames: PropTypes.array.isRequired,
};

export default EntitiesList;
