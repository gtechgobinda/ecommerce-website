import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader.jsx";
import { auth } from "../../../firebase/config.js";
import "./Reset.scss";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check Your Email for reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="reset-form">
        <div className="form-content">
          <header>Reset Password</header>
          <form className="form" onSubmit={resetPassword}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field button-field">
              <button type="submit">Reset Password</button>
            </div>
          </form>
          <div className="form-link">
            <span onClick={() => navigate("/login")}>-Login</span>
            <span onClick={() => navigate("/register")}>-Register</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
