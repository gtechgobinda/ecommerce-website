import ReactDOM from "react-dom";
import loader from "../../assets/loader.gif";
import "./Loader.scss";
const Loader = () => {
  return ReactDOM.createPortal(
    <>
      <div className="wrapper">
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      </div>
    </>,
    document.getElementById("loader")
  );
};

export default Loader;
