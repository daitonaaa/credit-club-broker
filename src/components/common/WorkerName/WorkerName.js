import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Person } from '@creditclub/helpers';


const WorkerName = ({ workers, id }) => {
  const broker = workers.data.find((b) => b.id === id);

  if (workers.fetching) {
    return 'Загрузка...'
  } else {
    return broker ? Person.getFullName(broker, true) : 'Не известно';
  }
};

WorkerName.propTypes = {
  workers:  PropTypes.shape({
    data: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
  }),
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  workers: state.workers,
});

export default connect(mapStateToProps)(WorkerName);
