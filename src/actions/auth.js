import api from 'api';
import url from 'routes/urls';
import { getUser } from 'actions/user';
import { push } from 'connected-react-router';
import * as actionTypes from 'constants/actionTypes';
import { token, take, phoneUtils } from '@creditclub/helpers';


export const authSetField = (field, value) => ({
  type: actionTypes.AUTH_SET_FIELD,
  field, value,
});


export const resetAuth = () => ({
  type: actionTypes.AUTH_RESET,
});


export const login = () => (dispatch, getState) => {
  const { username, password } = getState().auth;
  dispatch(authSetField('fetching', true));

  return api.auth.getToken(phoneUtils.unParse(username), password)
    .then(({ data }) => {
      dispatch(authSetField('success', true));

      setTimeout(() => {
        token.set(data);
        dispatch(push(url.application.path));
      }, 300);
    })
    .catch((e) => {
      const err = take(e, 'response.data', {});
      dispatch(authSetField('fetching', false));

      /** @namespace err.error_description */
      dispatch(authSetField(
        'errorText',
        err.error_description === 'Bad credentials'
          ? 'Не верный логин или пароль'
          : err.error_description
      ))
    });
};

export const logout = () => (dispatch) => {
  token.clear();
  dispatch(push(url.login.path));
};

export const updateToken = (withUpdateUser) => (dispatch) => {
  return api.auth.updateToken()
    .then(({ data }) => {
      token.set(data);

      if (withUpdateUser) {
        dispatch(getUser());
      }

      return data;
    })
    .catch(() => dispatch(logout()));
};
