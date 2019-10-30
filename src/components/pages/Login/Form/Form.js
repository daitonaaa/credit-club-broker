import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  Input,
  Button,
} from 'components/common';

import {
  login,
  resetAuth,
  authSetField,
} from 'actions/auth';

import styles from './Form.module.scss';


class Form extends Component {

  static propTypes = {
    success: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,

    login: PropTypes.func.isRequired,
    resetAuth: PropTypes.func.isRequired,
    authSetField: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.nodeElement) this.nodeElement.addEventListener('keyup', this.formOnKeyUp);
  }

  componentWillUnmount() {
    const { resetAuth } = this.props;

    this.nodeElement.removeEventListener('keyup', this.formOnKeyUp);

    resetAuth();
  }

  formOnKeyUp = (e) => {
    const { login } = this.props;

    if (e.key === 'Enter' && !this.getDisabledButtonMode()) login();
  };

  getDisabledButtonMode = () => {
    const { username, password } = this.props;

    return username.length < 16 || password.length < 3;
  };

  handleChangeField = (field, value) => {
    const {
      errorText,
      authSetField,
    } = this.props;

    if (errorText) authSetField('errorText', '');

    authSetField(field, value);
  };


  render() {
    const {
      login,
      success,
      fetching,
      username,
      password,
      errorText,
    } = this.props;

    const inputLoginOptions = {
      maskChar: '',
      type: 'text',
      value: username,
      autoFocus: true,
      disabled: fetching,
      className: styles.input,
      mask: '+7 999 999-99-99',
      placeholder: 'Номер телефона',
      onChange: (val) => this.handleChangeField('username', val),
    };

    const inputPasswordOptions = {
      value: password,
      type: 'password',
      disabled: fetching,
      autocomplete: 'on',
      placeholder: 'Пароль',
      className: styles.input,
      onChange: (val) => this.handleChangeField('password', val),
    };

    const buttonLoginOptions = {
      title: 'Войти',
      onClick: login,
      loading: fetching,
      autocomplete: 'on',
      disabled: this.getDisabledButtonMode(),
    };

    return (
      <div className={cx(styles.content, {
        [styles.success]: success,
      })} ref={(el) => this.nodeElement = el}>
        <h1>Вход</h1>
        <div className={styles.title}>
          Используйте номер телефона, который указан в агентском договоре.
        </div>
        <Input {...inputLoginOptions} />
        <Input {...inputPasswordOptions} />
        <Button {...buttonLoginOptions} />
        {
          errorText && (
            <div className={styles.error}>
              {errorText}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
});

const mapDispatchToProps = {
  login,
  resetAuth,
  authSetField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
