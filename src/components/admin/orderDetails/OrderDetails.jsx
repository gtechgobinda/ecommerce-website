import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { ChangeOrderStatus, Loader } from "../../index";
import "./OrderDetails.scss";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);
  const navigate = useNavigate();
  useEffect(() => {
    setOrder(document);
  }, [document]);
  console.log(order);
  return (
    <>
      <div className="all-order-details-container">
        <h2 className="order-details-heading">Order Details</h2>
        <button
          onClick={() => navigate("/admin/orders")}
          className="backToOrders"
        >
          <BiArrowBack />
          Back To Orders
        </button>
        {order === null ? (
          <Loader />
        ) : (
          <>
            <div key={id} className="order-details-main">
              <p>
                <b>Order ID: </b>
                {order.id}
              </p>
              <p>
                <b>Order Total Amount: </b>
                {order.orderAmount.toFixed(2)}
              </p>
              <p className="order-status">
                <b>Order Status: </b>
                <span
                  className={
                    order.orderStatus !== "Delivered..."
                      ? "pending"
                      : "delivered"
                  }
                >
                  {order.orderStatus}
                </span>
              </p>
              <p className="shipping-address">
                <b>Shipping Address: </b>
                <br />
                Address Line: {order.shippingAddress.line1},
                {order.shippingAddress.line2},{order.shippingAddress.city}
                <br />
                State: {order.shippingAddress.state}
                <br />
                Country: {order.shippingAddress.country}
              </p>
            </div>
            {order.cartItems.map((cart, index) => {
              const { id, name, price, imageURL, cartQuantity } = cart;
              return (
                <>
                  <div className="order-item" key={id}>
                    <div className="order-img">
                      <img src={imageURL} alt="aaaa" />
                    </div>
                    <div className="order-desc">
                      <p className="product-name">
                        <b>Product:</b> {name}
                      </p>
                      <p className="product-price">
                        <b>Product Price:</b> {price.toFixed(2)}
                      </p>
                      <p className="product-qty">
                        <b>Product Quantity: </b>
                        {cartQuantity}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
