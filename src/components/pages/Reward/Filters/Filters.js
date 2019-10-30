import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getReward,
  rewardListSetFilter,
} from 'actions/reward';

import styles from './Filters.module.scss';
import filterOptions from 'constants/listFor';
import { DatePicker, Select } from '@creditclub/react-components';


const Filters = ({ filters, getReward, rewardListSetFilter }) => {

  const handleChangeFilter = (prop, value) => {
    if (filters[prop] === value) {
      return;
    }

    rewardListSetFilter(prop, value);
    getReward();
  };

  const datePickerProps = {
    maxDate: new Date(),
    noOverflowBody: true,
    value: filters.period,
    views: ['month', 'year'],
    placeholder: 'Укажите период',

    onChange: (date) => handleChangeFilter('period', date),
  };

  const selectProps = {
    value: filters.listFor,
    options: filterOptions,
    placeholder: 'Фильтр',

    onChange: (option) => handleChangeFilter('listFor', option.value),
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.picker}>
        <DatePicker {...datePickerProps} />
      </div>
      <div className={styles.select}>
        <Select {...selectProps} />
      </div>
    </div>
  )
};

Filters.propTypes = {
  filters: PropTypes.shape({
    listFor: PropTypes.string.isRequired,
    period: PropTypes.object.isRequired,
  }),

  getReward: PropTypes.func.isRequired,
  rewardListSetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.reward.list.filters,
});

const mapDispatchToProps = {
  getReward,
  rewardListSetFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
