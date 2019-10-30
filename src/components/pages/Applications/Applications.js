import moment from 'moment';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { moneyUtils } from '@creditclub/helpers';
import { push } from 'connected-react-router';
import { getPageTitle, appNumberFormat } from 'helpers';

import url from 'routes/urls';

import {
  getApplications,
  resetApplications,
} from 'actions/application';

import Filters from './Filters';
import { Button } from '@creditclub/react-components';
import { EntitiesList, WorkerName } from 'components/common';

import styles from './Applications.module.scss';


class Applications extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,


    push: PropTypes.func.isRequired,
    getApplications: PropTypes.func.isRequired,
    resetApplications: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getApplications } = this.props;

    getApplications();
  }

  componentWillUnmount() {
    const { resetApplications } = this.props;

    resetApplications();
  }

  render() {
    const {
      data,
      push,
      user,
      route,
      filters,
      fetching,
    } = this.props;

    const listWithBrokers =
      filters.listFor === 'all' &&
      user.accessRights.hasPermission(user.accessRights.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS);

    const buttonCreateApplicationOptions = {
      title: 'Создать',
      className: styles.create,
      onClick: () => push(url.createApplication.path),
    };

    const entitiesListProps = {
      fetching,
      gridTemplateColumns: listWithBrokers
        ? [0.1, 0.2, 0.35, 0.25, 0.2, 0.2]
        : [0.1, 0.2, 0.5, 0.2, 0.2],
      columnNames: [
        'Заявка',
        'Сумма Займа',
        'Клиент',
        listWithBrokers && 'Брокер',
        'Статус',
        'Дата и время'
      ],
      rowData: Array
        .from(data)
        .reverse()
        .map((listItem, i) => ([
          appNumberFormat(listItem.number),
          listItem.loanAmount ? moneyUtils.RUB(listItem.loanAmount) : 'Не задана',
          listItem.client,
          listWithBrokers && <WorkerName key={i} id={listItem.brokerId} />,
          listItem.status,
          moment(listItem.date).format('D MMM HH:mm')
        ]))
    };

    return (
      <>
        <Helmet title={getPageTitle(route.title)} />
        <div className={styles.head}>
          <Filters />
          <Button {...buttonCreateApplicationOptions} />
        </div>
        <EntitiesList {...entitiesListProps} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.application.list,
  user: state.user.data,
});

const mapDispatchToProps = {
  push,
  getApplications,
  resetApplications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
