import url from 'routes/urls';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { push } from 'connected-react-router';


class Home extends Component {

  static propTypes = {
    push: PropTypes.func.isRequired,
  }

  render() {
    const { push } = this.props;

    return (
      <div>
        {push(url.application.path)}
      </div>
    )
  }
}

const mapDispatchToProps = {
  push,
};

export default connect(null, mapDispatchToProps)(Home);
