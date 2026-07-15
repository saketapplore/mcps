const Loader = () => {
  return (
    <div className="loader-container">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="loader-card" key={index}>
          <div className="loader-image skeleton"></div>

          <div className="loader-name skeleton"></div>

          <div className="loader-email skeleton"></div>

          <div className="loader-phone skeleton"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;