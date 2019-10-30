import * as actionTypes from 'constants/actionTypes';

import { getUser, resetUser } from 'actions/user';
import { resetUiMessages } from 'actions/uiMessages';
import { getWorkers, resetWorkers } from 'actions/workers';


export const mainSetParameter = (prop, value) => ({
  type: actionTypes.MAIN_SET_FIELD,
  prop, value,
});


const reset = () => ({
  type: actionTypes.MAIN_RESET
});


export const initApp = () => async (dispatch) => {
  dispatch(mainSetParameter('criticalError', false));
  dispatch(resetUiMessages());

  await dispatch(getUser());
  dispatch(getWorkers());
};

export const resetApp = () => (dispatch) => {
  dispatch(reset());
  dispatch(resetWorkers());

  /**
   * На локальной сборке вместе с
   * hot update компоненты не демонтировались до конца
   * а у нас тут до renderRoutes обязательно должен загрузится пользователь
   * и его permissions
   */
  if (!process.env.LOCAL_BUILD) {
    dispatch(resetUser());
  }
};
