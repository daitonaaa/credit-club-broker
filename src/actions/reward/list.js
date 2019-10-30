import api from 'api';
import _ from 'lodash';
import moment from 'moment';
import { take } from '@creditclub/helpers';
import { addError } from 'actions/error';
import * as actionTypes from 'constants/actionTypes';


const setFetchingStatus = (status) => ({
  type: actionTypes.REWARD_LIST_SET_FETCHING_STATUS,
  status,
});


const setReward = (entries, totalReward) => ({
  type: actionTypes.REWARD_LIST_SET,
  entries, totalReward,
});


export const resetReward = () => ({
  type: actionTypes.REWARD_LIST_RESET,
});


export const rewardListSetFilter = (prop, value) => ({
  type: actionTypes.REWARD_LIST_SET_FILTER,
  prop, value,
});


export const getReward = () => (dispatch, getState) => {
  const { filters } = getState().reward.list;
  const period = _.cloneDeep(filters.period);

  /**
   * TODO: Убрать исскуственный рендж после
   * появления у апи поля period
   */
  period.setDate(1);
  const startDate = period;

  const endDate = _.cloneDeep(filters.period);
  endDate.setDate(
    new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
  );

  const options = {
    self: filters.listFor === 'self',
    endDate: moment(endDate).format('YYYY-MM-DD'),
    startDate: moment(startDate).format('YYYY-MM-DD'),
  };

  dispatch(setFetchingStatus(true));

  api.reward.getReward(options)
    .then(({ data }) => dispatch(setReward(data.entries, data.totalReward)))
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
          text: 'Не удалось загрузить вознаграждение, пожалуйста повторите ещё раз',
        },
      }));
    })
    .finally(() => dispatch(setFetchingStatus(false)))
};
