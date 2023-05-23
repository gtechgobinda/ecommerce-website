import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reset.scss";
const Reset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="reset-form">
        <div className="form-content">
          <header>Reset Password</header>
          <form className="form">
            <div className="field input-field">
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="field button-field">
              <button>Reset Password</button>
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
