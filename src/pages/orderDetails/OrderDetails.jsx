import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/index.js";
import useFetchDocument from "../../customHooks/useFetchDocument.jsx";
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
      <div className="order-details-container">
        <h2 className="order-details-heading">Order Details</h2>
        <button
          onClick={() => navigate("/order-history")}
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
                <b>Order Amount: </b>
                {order.orderAmount.toFixed(2)}
              </p>
              <p className="order-status">
                <b>Order Status: </b>
                {order.orderStatus}
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
                      <div className="review-button">
                        <button
                          onClick={() => navigate(`/review-product/${id}`)}
                        >
                          Review Product
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
