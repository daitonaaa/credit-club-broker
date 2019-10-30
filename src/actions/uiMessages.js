import uuidv4 from 'uuid/v4';
import * as actionTypes from 'constants/actionTypes';


export const deleteMessage = (id) => ({
  type: actionTypes.UI_MESSAGES_REMOVE_ONE,
  id,
});


export const resetUiMessages = () => ({
  type: actionTypes.UI_MESSAGES_RESET,
});


const addMessage = (event) => ({
  type: actionTypes.UI_MESSAGES_ADD_MESSAGE,
  event,
});


/**
 *
 * @param { string } event.text
 * @param { warn | error | static } event.type
 *
 * @param {object=} event.button
 * @package {string=} event.button.text
 * @param {function=} event.button.handler
 * Если передана функция то отобразит кнопку
 * а при нажатии вызовет её и закроет сообщение
 */
export const addUiMessage = (event) => (dispatch) => {
  if (!event.text) {
    return;
  }

  dispatch(addMessage(
    new UiMessage(event.text, event.type, event.button)
  ));
};

// helpers
export class UiMessage {
  constructor(text, type = 'static', button = null) {
    this.id = uuidv4();
    this.type = type;
    this.text = text;
    this.button = button;
  }
}
