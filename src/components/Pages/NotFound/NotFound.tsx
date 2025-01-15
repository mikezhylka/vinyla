import { useEffect } from "react";
import { NavLink } from "react-router";
import { useAppContext } from "../../../contexts/App/useAppContext";
import "./index.scss";

export const NotFound: React.FC = () => {
  const { setError } = useAppContext();

  useEffect(() => {
    setError(true);

    return () => setError(false);
  }, [setError]);
  
  return (
    <div className="not-found">
      <h1 className="not-found__error-number">404</h1>
      <h2 className="not-found__title">Page not found</h2>
      <p className="not-found__description">
        Oops!, the page you looking for does not exist
      </p>
      <button className="not-found__button">
        <NavLink className="not-found__link" to="/">
          Go to main page
        </NavLink>
      </button>
    </div>
  );
};
