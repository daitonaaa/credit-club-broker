import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './Message.module.scss';

const title = {
  error: 'Ошибка',
  static: 'Уведомление',
  warn: 'Предупреждение',
};


class Message extends Component {

  static propTypes = {
    button: PropTypes.object,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,

    onDelete: PropTypes.func.isRequired,
  }

  handleDelete = () => {
    const { id, onDelete } = this.props;

    onDelete(id);
  }

  handleClickButton = () => {
    const { button } = this.props;

    if (button.handler) {
      button.handler();
      this.handleDelete();
    }
  };

  render() {
    const { text, type, button } = this.props;

    return (
      <div className={cx(styles.wrapper, {
        [styles.warn]: type === 'warn',
        [styles.error]: type === 'error',
        [styles.message]: type === 'static',
      })}>
        <div className={styles.head}>
          <span>{title[type]}</span>
          <i className="zmdi zmdi-close" onClick={this.handleDelete} />
        </div>
        <div>
          {text}
        </div>
        {
          button && button.text && (
            <div
              className={styles.handler}
              onClick={this.handleClickButton}
            >
              {button.text}
            </div>
          )
        }
      </div>
    )
  }
}

export default Message;
