import api from 'api';
import moment from 'moment';
import { addError } from 'actions/error';
import { take } from '@creditclub/helpers';
import * as actionTypes from 'constants/actionTypes';


const setFetchingStatus = (status) => ({
  type: actionTypes.APPLICATION_LIST_SET_FETCHING_STATUS,
  status,
});


const setApplications = (applications) => ({
  type: actionTypes.APPLICATION_LIST_SET,
  applications,
});


export const resetApplications = () => ({
  type: actionTypes.APPLICATION_LIST_RESET,
});


export const applicationListSetFilter = (prop, value) => ({
  type: actionTypes.APPLICATION_LIST_SET_FILTER,
  prop, value,
});


export const getApplications = () => (dispatch, getState) => {
  const user = getState().user.data;
  const { filters } = getState().application.list;

  dispatch(setFetchingStatus(true));

  const userCanSeeAll = user.accessRights.hasPermission(
    user.accessRights.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS
  );

  const period = moment(filters.period).format('YYYY-MM-DD');
  const self = userCanSeeAll ? filters.listFor === 'self' : true;

  return api.application.getApplications(period, self)
    .then(({ data }) => dispatch(setApplications(data)))
    .catch((err) => {
      if (
        take(err, 'constructor.name', '') === 'Cancel' ||
        take(err, 'response.status') === 403
      ) {
        return;
      }

      dispatch(addError({
        err: { origin: err },
        ui: {
          text: 'Не удалось загрузить заявки, пожалуйста повторите ещё раз',
        },
      }));
    })
    .finally(() => dispatch(setFetchingStatus(false)));
};
