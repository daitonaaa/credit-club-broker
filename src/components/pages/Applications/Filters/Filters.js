import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Select,
  DatePicker,
} from '@creditclub/react-components';

import filterOptions from 'constants/listFor'

import {
  getApplications,
  applicationListSetFilter,
} from 'actions/application';

import styles from './Styles.module.scss';


const Filters = ({ filters, applicationListSetFilter, user, getApplications }) => {

  const handleChangeFilter = (prop, value) => {
    if (filters[prop] === value) {
      return;
    }

    applicationListSetFilter(prop, value);
    getApplications();
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
      {
        user.accessRights.hasPermission(user.accessRights.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS) && (
          <div className={styles.select}>
            <Select {...selectProps} />
          </div>
        )
      }
    </div>
  )
};

Filters.propTypes = {
  user: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,

  getApplications: PropTypes.func.isRequired,
  applicationListSetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  filters: state.application.list.filters,
});

const mapDispatchToProps = {
  getApplications,
  applicationListSetFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
