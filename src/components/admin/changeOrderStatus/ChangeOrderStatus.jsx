import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import "./ChangeOrderStatus.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order Status Changes Successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="order-status">
        <h4>Update Status</h4>
        <form onSubmit={(e) => editOrder(e, id)} className="order-status-form">
          <div className="order-status-option">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
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
