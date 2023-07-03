import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";
import "./AdminOnlyRoutes.scss";

// eslint-disable-next-line react/prop-types
const AdminOnlyRoute = ({ children }) => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  const userEmail = useSelector(selectEmail);
  if (userEmail === import.meta.env.VITE_REACT_ADMIN_USER) {
    return children;
  }
  return (
    <section className="section">
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user</p>
        <br />
        <button className="btn" onClick={handleBackToHome}>
          &larr;Back To Home
        </button>
      </div>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === import.meta.env.VITE_REACT_ADMIN_USER) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
