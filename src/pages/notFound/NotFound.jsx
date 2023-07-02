import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found-page">
        <h2>404</h2>
        <p>Opppsss,page not found</p>
        <button className="backToHome-Btn" onClick={() => navigate("/")}>
          <FaArrowLeft />
          Back To Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
