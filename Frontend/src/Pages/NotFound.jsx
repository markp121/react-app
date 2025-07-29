import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <BiError className="error-icon" />
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="button neutral" style={{ appearance: "none" }}>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
