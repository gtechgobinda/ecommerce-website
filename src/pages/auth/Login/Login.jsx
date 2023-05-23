import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <>
      <div className="login-form">
        <div className="form-content">
          <header>Login</header>
          <form className="form" onSubmit={handleLogin}>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="field button-field">
              <button>Login</button>
            </div>
            <div className="reset">
              <span onClick={() => navigate("/reset")}>Forget Password?</span>
            </div>
          </form>

          <p className="or">--- OR ---</p>
          <div className="google-button">
            <button>
              <FcGoogle />
              Login With Google
            </button>
          </div>
          <div className="form-link">
            <span>
              Don{"'"}t have any accout?{" "}
              <Link to="/register" className="link">
                Register
              </Link>{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
