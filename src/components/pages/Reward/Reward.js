import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { getPageTitle, appNumberFormat } from 'helpers';

import { moneyUtils } from '@creditclub/helpers';

import {
  getReward,
  resetReward,
} from 'actions/reward';

import Filters from './Filters';
import { EntitiesList, WorkerName } from 'components/common';

import styles from './Reward.module.scss';


const Reward = ({ data, fetching, getReward, resetReward, route }) => {

  useEffect(() => {
    getReward();

    return resetReward;
  }, []);

  const entitiesListProps = {
    fetching,
    gridTemplateColumns: [0.3, 0.5, 1, 0.5, 0.5],
    columnNames: ['Заявка', 'Сумма Займа', 'Клиент', 'Брокер', 'Вознаграждение'],
    rowData: data.entries.map((listItem, i) => ([
      appNumberFormat(listItem.traceNumber),
      listItem.amount ? moneyUtils.RUB(listItem.amount) : 'Не задана',
      listItem.applicant || 'Не известно',
      <WorkerName key={i} id={listItem.brokerId} />,
      listItem.reward ? moneyUtils.RUB(listItem.reward) : 'Не известно',
    ])),
  };

  return (
    <>
      <Helmet title={getPageTitle(route.title)} />
      <div className={styles.head}>
        <Filters />
        <div className={styles.totalReward}>
          {
            (!fetching && data.totalReward > 0) && (
              moneyUtils.RUB(data.totalReward)
            )
          }
        </div>
      </div>
      <EntitiesList {...entitiesListProps} />
    </>
  )
};

Reward.propTypes = {
  data: PropTypes.shape({
    totalReward: PropTypes.any,
    entries: PropTypes.array.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,

  getReward: PropTypes.func.isRequired,
  resetReward: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.reward.list,
});

const mapDispatchToProps = {
  getReward,
  resetReward,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reward);
