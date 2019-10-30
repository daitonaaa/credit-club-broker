import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import { Loading } from 'components/common';

import styles from './Button.module.scss';


class Button extends Component {

  static propTypes = {
    type: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    buttonType: PropTypes.string,
    title: PropTypes.string.isRequired,

    onClick: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    type: 'blue',
  };

  handleClick = () => {
    const { onClick } = this.props;

    if (onClick) onClick();
  };

  render() {
    const {
      type,
      title,
      loading,
      disabled,
      className,
      buttonType = 'button',
    } = this.props;

    const buttonClassName = classNames(styles.box, {
      [styles.loading]: loading,
      [styles.disabled]: disabled,
      [styles[type]]: !!type,
      [className]: !!className,
    });

    return (
      <button
        type={buttonType}
        disabled={disabled}
        onClick={this.handleClick}
        className={buttonClassName}
      >
        {title}
        {
          loading && (
            <div className={styles.boxLoading}>
              <Loading min white />
            </div>
          )
        }
      </button>
    );
  }
}

export default Button;
