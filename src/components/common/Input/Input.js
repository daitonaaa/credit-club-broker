import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import InputMask from 'react-input-mask';

import styles from './Input.module.scss';


/**
 * @param {string} mask - https://github.com/sanniassin/react-input-mask
 */
class Input extends Component {

  static propTypes = {
    getRef: PropTypes.any,
    onlyNum: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    type: PropTypes.string,
    fadeIn: PropTypes.bool,
    mask: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    maskChar: PropTypes.string,
    className: PropTypes.string,
    noTransform: PropTypes.bool,
    placeholder: PropTypes.string,
    autocomplete: PropTypes.string,

    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    autoFill: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fadeIn: false,
    maskChar: '_',
  }

  state = {
    active: false,
    show: !this.props.fadeIn,
  };

  componentDidMount() {
    const {
      getRef,
      fadeIn,
    } = this.props;

    if (getRef) getRef(this.nodeElement);

    if (fadeIn) setTimeout(() => this.setState({ show: true }), 55);
    else this.setState({ show: true });
  }

  componentWillUnmount() {
    this.setState({ show: false });

  }

  autofillCompleted() {
    const { autoFill } = this.props;

    if (autoFill) autoFill();
  }

  handleChange = (e) => {
    const { onChange, onlyNum } = this.props;

    if (onChange) {

      if (onlyNum) {
        if (/^\d+$/.test(e.target.value) || e.target.value === '') onChange(e.target.value, e);
        return;
      }

      onChange(e.target.value, e);
    }
  };

  handleKeyUp = (e) => {
    const { onKeyUp } = this.props;

    if (onKeyUp) onKeyUp(e);
  };

  handleBlur = () => {
    const { onBlur } = this.props;

    this.setState({ active: false });
    if (onBlur) onBlur();
  };

  handleFocus = (e) => {
    const { onFocus } = this.props;

    this.setState({ active: true });
    if (onFocus) onFocus(e);
  };

  render() {
    const {
      type,
      mask,
      value,
      disabled,
      maskChar,
      className,
      autoFocus,
      placeholder,
      noTransform,
      autocomplete,
    } = this.props;

    const {
      show,
      active,
    } = this.state;

    const boxClassName = classNames(styles.box, {
      show,
      [className]: !!className,
      [styles.disabled]: disabled,
      [styles.boxShow]: !noTransform && active,
    });

    const inputOptions = {
      autoFocus, placeholder,
      name, type, value, disabled,

      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      autoComplete: autocomplete || '',
      ref: input => this.nodeElement = input,
    };

    if (mask) inputOptions.mask = mask;

    return (
      <div className={boxClassName}>
        { mask ? <InputMask {...inputOptions} maskChar={maskChar} /> : <input {...inputOptions} /> }
      </div>
    );
  }
}

export default Input;
