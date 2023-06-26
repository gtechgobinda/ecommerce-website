import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import prod from "../../assets/default-product-timg.png";
import { Loader } from "../../components";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import "./OrderHistory.scss";
const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  console.log(data);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };
  const filteredOrders = orders.filter((order) => order.userID === userID);
  return (
    <>
      {/* <section>
        <div className="order-container">
          <h2>Order History</h2>
          <p>
            Open an order to leave a <b>Product Review</b>
          </p>
          <br />
          <>
            {isLoading && <Loader />}
            <div className="table">
              {orders.length === 0 ? (
                <p>No order found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Date</th>
                      <th>OrderID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const {
                        id,
                        orderDate,
                        orderTime,
                        orderAmount,
                        orderStatus,
                      } = order;
                      return (
                        <>
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>
                              {orderDate} at {orderTime}
                            </td>
                            <td>{id}</td>
                            <td>{orderAmount}</td>
                            <td>{orderStatus}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        </div>
      </section> */}

      <div className="orderHistory-container">
        <h2 className="heading">Your Order History</h2>
        <p className="heading-next-text">
          Open an order to leave a <b>product review</b>
        </p>
        <>
          {isLoading && <Loader />}
          {filteredOrders.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            <>
              <div className="orderHistory-content">
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <>
                      <div
                        className="order-item"
                        key={id}
                        onClick={() => handleClick(id)}
                      >
                        <p className="serial-no">{index + 1}</p>
                        <div className="order-img">
                          <img src={prod} alt="aaaa" />
                        </div>
                        <div className="order-desc">
                          <p className="order-date-time">
                            <b>Date:</b> {orderDate} at {orderTime}
                          </p>
                          <p className="order-id">
                            <b>Order ID:</b> {id}
                          </p>
                          <p className="order-amount">
                            <b>Order Amount:</b> ₹{orderAmount}
                          </p>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? "pending"
                                : "delivered"
                            }
                          >
                            <b>Order Status:</b> {orderStatus}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default OrderHistory;
