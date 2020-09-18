import PropTypes from 'prop-types';

const dogShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  dogName: PropTypes.string.isRequired,
  dogAge: PropTypes.string.isRequired,
  dogBreed: PropTypes.string.isRequired,
  dogImage: PropTypes.string.isRequired,
});

export default { dogShape };
