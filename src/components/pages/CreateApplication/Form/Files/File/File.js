import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fileUtils } from '@creditclub/helpers';

import { deleteFile } from 'actions/document';

import styles from './File.module.scss';


class File extends Component {

  static propTypes = {
    file: PropTypes.object.isRequired,

    deleteFile: PropTypes.func.isRequired,
  };

  state = {
    src: null,
    noImage: true,
    noPreview: false,
  };

  componentDidMount() {
    const { file } = this.props;
    const reader = new FileReader();

    reader.onloadend = () => {
      if (fileUtils.isImage(file.name)) {
        this.setState({ src: reader.result });
      } else {
        this.setState({
          noPreview: true,
          src: fileUtils.getFilePreview(fileUtils.getFileExtension(file.name))
        });
      }
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {
      src,
      noImage,
      noPreview,
    } = this.state;

    const {
      file,
      deleteFile,
    } = this.props;

    const imgOptions = {
      src,
      onLoad: () => this.setState({ noImage: false }),
    };

    return (
      <div className={styles.wrapper}>
        <div className={cx(styles.image, {
          [styles.imageShow]: !noImage,
          [styles.noPreview]: noPreview,
        })}>
          <img {...imgOptions} />
        </div>
        <div className={styles.filename} title={file.name}>
          {file.name}
        </div>
        <div className={styles.remove} onClick={() => deleteFile(file.name)}>
          <i className="zmdi zmdi-delete"/>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  deleteFile,
};

export default connect(null, mapDispatchToProps)(File);
