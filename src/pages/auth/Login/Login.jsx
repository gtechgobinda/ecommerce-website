import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { auth } from "../../../firebase/config";
import { selectPeviousURL } from "../../../redux/slice/cartSlice";
import "./Login.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const previousURL = useSelector(selectPeviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successfull");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  //login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="login-form">
        <div className="form-content">
          <header>Login</header>
          <form className="form" onSubmit={loginUser}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
            <div className="reset">
              <span onClick={() => navigate("/reset")}>Forget Password?</span>
            </div>
          </form>

          <p className="or">--- OR ---</p>
          <div className="google-button">
            <button onClick={signInWithGoogle}>
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
