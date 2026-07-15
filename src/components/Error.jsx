const Error = ({message , onRetry}) => {
  return (
    <div className="error-container">
       <p className="error-message">
         {message || "Failed to fetch employees"}
       </p>
       <button onClick={onRetry}>
         Retry
       </button>
    </div>
  )
}

export default Error;


