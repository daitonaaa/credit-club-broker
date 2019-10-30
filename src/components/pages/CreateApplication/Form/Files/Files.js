import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';

import File from './File';

import styles from './Files.module.scss';


const Files = ({ files, disabled, filesUploadProgress }) => {

  const uploadProgress = filesUploadProgress.reduce((acc, cur) => acc + cur.progress, 0);

  return (
    <Fragment>
      <div className={cx(styles.upload, {
        [styles.uploadActive]: uploadProgress > 0,
      })}>
        <p>Загрузка файлов</p>
        <span style={{ width: `${uploadProgress / filesUploadProgress.length}%` }} />
      </div>
      <div className={cx(styles.wrapper, {
        [styles.disabled]: disabled,
      })}>
        {
          files.map(item => (
            <File key={item.name} file={item} />
          ))
        }
      </div>
    </Fragment>

  )
};

Files.propTypes = {
  files: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  filesUploadProgress: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.document,
});

export default connect(mapStateToProps)(Files);
