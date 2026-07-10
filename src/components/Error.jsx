const Error = ({ message }) => {
  return (
    <p className="error-message">
      {message || 'An error occurred while fetching employees.'}
    </p>
  );
};

export default Error;
