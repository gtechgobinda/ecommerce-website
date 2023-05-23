import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.scss";
const Register = () => {
  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpPassword, setConfirmPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(fullName, email, password);
  };
  return (
    <>
      <div className="signup-form">
        <div className="form-content">
          <header>Register</header>
          <form className="form" onSubmit={handleSignup}>
            {/* <div className="field input-field">
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
            </div> */}
            <div className="field input-field">
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpPassword}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="field button-field">
              <button>Register</button>
            </div>
            <div className="form-link">
              <span>
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
