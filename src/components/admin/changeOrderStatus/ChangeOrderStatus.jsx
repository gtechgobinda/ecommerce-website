import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import "./ChangeOrderStatus.scss";

const ChangeOrderStatus = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const editOrder = () => {};
  return (
    <>
      {isLoading && <Loader />}
      <div className="order-status">
        <h4>Update Status</h4>
        <form onSubmit={editOrder} className="order-status-form">
          <div className="order-status-option">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" disabled>
                -- Choose One --
              </option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered...">Delivered...</option>
            </select>
          </div>
          <div className="order-status-btn">
            <button type="submit">Update Status</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
