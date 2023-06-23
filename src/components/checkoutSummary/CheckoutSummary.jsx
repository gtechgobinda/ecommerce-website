import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import "./CheckoutSummary.scss";
const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  return (
    <>
      <div className="checkoutSummary">
        <h3 className="heading">Checkout Summary:</h3>
        <div className="checkoutSummary-details">
          {cartItems.length === 0 ? (
            <>
              <div className="no-items">
                <p>No Items in your Cart</p>
                <button onClick={() => navigate("/#products")}>
                  RETURN TO SHOP
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="summary">
                <p>
                  Cart item(s): <b>{`${cartTotalQuantity}`}</b>
                </p>
                <div className="subtotal">
                  <h4>SUBTOTAL :</h4>
                  <h3>&#8377;{cartTotalAmount.toFixed(2)}</h3>
                </div>
                {cartItems.map((item, index) => {
                  const { id, name, price, cartQuantity, imageURL } = item;
                  return (
                    <>
                      <div className="singel-product" key={id}>
                        <h4 className="product-name">{name}</h4>
                        <div className="product-details">
                          <div className="product-photo">
                            <img src={imageURL} alt="" />
                          </div>
                          <div className="details">
                            <p>Quantity:{cartQuantity}</p>
                            <p>Unit Price:{price}</p>
                            <p>Set Price:{price * cartQuantity}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
