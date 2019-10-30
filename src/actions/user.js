import api from 'api';
import * as Sentry from '@sentry/browser';
import { addError } from 'actions/error';
import { UserAccessRights } from 'helpers';
import * as actionTypes from 'constants/actionTypes';

import { mainSetParameter } from 'actions/main';
import { applicationListSetFilter } from 'actions/application';


const setField = (field, value) => ({
  type: actionTypes.USER_SET_FIELD,
  field, value,
});


export const resetUser = () => ({
  type: actionTypes.USER_RESET,
});


const initUserParams = (user) => (dispatch, getState) => {
  const { isAppInit } = getState().main;

  if (user.accessRights.hasPermission(user.accessRights.ps.ORDERS_BROKER_VIEW_ORGANIZATION_ORDERS)) {
    dispatch(applicationListSetFilter('listFor', 'all'));
  }

  if (!isAppInit) {
    dispatch(mainSetParameter('isAppInit', true));

    Sentry.configureScope((scope) => {
      scope.setUser({
        id: user.id,
        position: user.position,
        username: user.fullName,
      });
    });

    window.addEventListener('load', () => {
      const { yaCounter55205317: metrika } = window;

      if (metrika) {
        metrika.params({
          brokerId: user.id,
        });
      }
    });
  }
};


export const getUser = () => (dispatch) => {
  dispatch(setField('fetching', true));

  return new Promise(async (resolve) => {
    try {
      const userResponse = await api.user.getUser();
      const permissionsResponse = await api.user.getUserPermissions();

      const user = {
        ...userResponse.data,
        accessRights: new UserAccessRights(permissionsResponse.data)
      };

      dispatch(initUserParams(user));
      dispatch(setField('data', user));
      dispatch(setField('fetching', false));
      resolve(user);
    } catch(err) {
      dispatch(addError({
        err: {
          origin: err,
          extra: {
            actionMethod: 'getUser',
          },
        },
      }));

      dispatch(setField('fetching', false));
      dispatch(mainSetParameter('criticalError', true));
    }
  });
};
