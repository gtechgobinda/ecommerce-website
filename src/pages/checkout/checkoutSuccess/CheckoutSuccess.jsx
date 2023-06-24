import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { SuccessFireworks } from "../../../components";
import "./CheckoutSuccess.scss";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    SuccessFireworks();
  });
  return (
    <>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <p className="heading-success">Checkout Successful</p>
          <p className="heading-thankyou">Thank you for your order!</p>
          <button
            type="button"
            width="300px"
            className="btn"
            onClick={() => navigate("/order-history")}
          >
            View Order Status
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
