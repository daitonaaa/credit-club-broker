import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import React, { Component } from 'react';

import { isEmpty } from 'ramda';
import { Person, fileUtils } from '@creditclub/helpers';
import validateParams from './validateParams';

import { resetUiMessages } from 'actions/uiMessages';
import { createApplication } from 'actions/application';
import { onDropFiles, resetDocument } from 'actions/document';

import {
  Input,
  Button,
  Textarea,
  NameComplete,
} from '@creditclub/react-components';
import Files from './Files';

import styles from './Form.module.scss';

const initialState = {
  form: {
    phone: '',
    email: '',
    comment: '',
    person: Person.createEmpty(),
  },
  fetching: false,
  errors: [],
};


class Form extends Component {

  state = initialState;

  static propTypes = {
    files: PropTypes.array.isRequired,

    onDropFiles: PropTypes.func.isRequired,
    resetDocument: PropTypes.func.isRequired,
    resetUiMessages: PropTypes.func.isRequired,
    createApplication: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    const {
      resetDocument,
      resetUiMessages,
    } = this.props;

    resetDocument();
    resetUiMessages();
  }

  validate = (field) => {
    const { errors, form } = this.state;
    const newErrors = new Set(errors);

    const checkField = (prop) => {
      const isValidField = validateParams.test[prop](form[prop]);

      if (isValidField) {
        newErrors.delete(prop);
      } else {
        newErrors.add(prop);
      }
    };

    if (field) {
      checkField(field);
    } else {
      validateParams.requiredFields.forEach(checkField);
    }

    this.setState({ errors: Array.from(newErrors) });

    return !Boolean(newErrors.size);
  };

  handleSubmitForm = async () => {
    if (!this.validate()) return;

    const { form } = this.state;
    const { createApplication } = this.props;

    this.setState({ fetching: true });

    await createApplication(form)
      .then(() => this.setState(initialState));
  };

  handleChangeFormField = (prop, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [prop]: value,
      }
    })
  };

  render() {
    const { files, onDropFiles } = this.props;
    const { form, fetching, errors } = this.state;

    const nameCompleteProps = {
      strict: true,
      disabled: fetching,
      value: form.person,
      title: 'ФИО Клиента',
      className: styles.nameComplete,
      error: errors.includes('person'),
      placeholder: 'Иванов Иван Иванович',

      onBlur: () => this.validate('person'),
      onChange: (person) => this.handleChangeFormField('person', person),
    };

    const inputPhoneOptions = {
      maskChar: '',
      title: 'Телефон',
      value: form.phone,
      disabled: fetching,
      mask: '+7 999 999-99-99',
      error: errors.includes('phone'),
      placeholder: '+7 921 123-45-67',
      className: styles.contactsInput,

      onBlur: () => this.validate('phone'),
      onChange: (val) => this.handleChangeFormField('phone', val),
    };

    const inputEmailOptions = {
      value: form.email,
      title: 'Эл. почта',
      disabled: fetching,
      placeholder: 'mail@mail.ru',
      error: errors.includes('email'),
      className: styles.contactsInput,

      onBlur: () => this.validate('email'),
      onChange: (val) => this.handleChangeFormField('email', val.toLowerCase().trim()),
    };

    const commentTextareaProps = {
      maxHeight: 250,
      disabled: fetching,
      resize: 'vertical',
      value: form.comment,
      title: 'Комментарий',
      placeholder: 'Укажите дополнительную инфомацию',
      onChange: (val) => this.handleChangeFormField('comment', val),
    };

    const dropZoneOptions = {
      multiple: true,
      disabled: fetching,
      onDrop: onDropFiles,
      className: styles.dropzone,
      accept: fileUtils.getAllowMimeTypes(),
      activeClassName: styles.dropzoneActive,
      disabledClassName: styles.dropzoneDisabled,
    };

    const buttonSubmitOptions = {
      title: 'Отправить',
      loading: fetching,
      onClick: this.handleSubmitForm,
    };

    return (
      <div className={styles.wrapper}>
        <NameComplete {...nameCompleteProps} />
        <div className={styles.contacts}>
          <Input {...inputPhoneOptions} />
          <Input {...inputEmailOptions} />
        </div>
        <div className={styles.comment}>
          <Textarea {...commentTextareaProps} />
        </div>
        <div className={styles.attach}>
          <div className={styles.dropzoneTitle}>
            Документы и фотографии объекта (если есть)
          </div>
          <Dropzone {...dropZoneOptions}>
            <p>Перетащите сюда файлы</p>
            <div className={styles.dropzoneOverlay}>
              <i className="zmdi zmdi-cloud-download"/>
            </div>
          </Dropzone>
          {
            !isEmpty(files) && (
              <Files disabled={fetching} />
            )
          }
        </div>
        <div className={styles.controls}>
          <div className={styles.info}>

          </div>
          <div>
            <Button {...buttonSubmitOptions} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.document.files,
});

const mapDispatchToProps = {
  onDropFiles,
  resetDocument,
  resetUiMessages,
  createApplication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
