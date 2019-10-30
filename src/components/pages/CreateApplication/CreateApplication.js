import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getPageTitle } from 'helpers';
import React, { Fragment } from 'react';

import Form from './Form';
import Requirements from './Requirements';

import styles from './CreateApplication.module.scss';


const CreateApplication = ({ route: { title } }) => (
  <Fragment>
    <Helmet title={getPageTitle(title)} />
    <h1>{title}</h1>
    <div className={styles.wrapper}>
      <Form />
      <Requirements />
    </div>
  </Fragment>
);

CreateApplication.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CreateApplication;
