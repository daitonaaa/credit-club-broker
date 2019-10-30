// THIS ACTION DO NOT HAVE REDUCER

import { isEmpty } from 'ramda';
import * as Sentry from '@sentry/browser';
import { addUiMessage } from 'actions/uiMessages';

/**
 * @param {string=} event.ui.text
 * Если есть то показывает ошибку на ui
 *
 * @param {function=} event.ui.button.text
 * @param {function=} event.ui.button.handler
 * Если есть покажет кнопку в uiMessage и вызовет функцию при её нажатии
 * Но если вместе с ним не будет передает ui.text то сообщение не покажется
 *
 * @param {object=} event.err.origin
 * Если передаётся данный обьект отправляем его в sentry
 *
 * @param {object=} event.err.extra
 * Дополнительные параметры для sentry
 */
export const addError = (event) => (dispatch) => {
  const {
    ui = {},
    err = {},
  } = event;

  if (!isEmpty(ui) && ui.text) {
    dispatch(addUiMessage({
      type: 'error',
      text: ui.text,
      button: ui.button ? ui.button : null,
    }));
  }

  if (!isEmpty(err) && err.origin) {
    Sentry.withScope((scope) => {
      if (err.extra) {
        scope.setExtras(err.extra);
      }

      Sentry.captureException(err.origin);
    })
  }
};
