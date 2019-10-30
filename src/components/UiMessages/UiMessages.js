import cx from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import {
  deleteMessage,
  resetUiMessages,
} from 'actions/uiMessages';

import Message from './Message';

import styles from './UiMessages.module.scss';


class UiMessages extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,

    deleteMessage: PropTypes.func.isRequired,
    resetUiMessages: PropTypes.func.isRequired,
  };

  handleDelete = (id) => {
    const { deleteMessage } = this.props;

    deleteMessage(id);
  };

  render() {
    const {
      messages,
      resetUiMessages,
    } = this.props;

    return (
      <div className={cx(styles.wrapper, {
        [styles.hasMessages]: Boolean(messages.length),
      })}>
        {
          !isEmpty(messages) && (
            <Fragment>
              {
                messages.length > 1 && (
                  <div
                    onClick={resetUiMessages}
                    className={styles.closeall}
                  >
                    Скрыть
                  </div>
                )
              }
              {
                messages.map(item => (
                  <Message
                    {...item}
                    key={item.id}
                    onDelete={this.handleDelete}
                  />
                ))
              }
            </Fragment>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.uiMessages,
});

const mapDispatchToProps = {
  deleteMessage,
  resetUiMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UiMessages);
