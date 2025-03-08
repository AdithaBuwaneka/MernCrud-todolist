import PropTypes from "prop-types";

const MyComponent = ({ message }) => {
  return <div>{message}</div>;
};

MyComponent.propTypes = {
  message: PropTypes.string.isRequired, // Define the prop type
};

export default MyComponent;