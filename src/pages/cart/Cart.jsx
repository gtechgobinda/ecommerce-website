import { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = (cart) => {
    dispatch(CLEAR_CART(cart));
  };
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <>
      <section>
        <div className="cart-products">
          <h2 className="heading">SHOPPING CART</h2>
          {cartItems.length === 0 ? (
            <>
              <div className="empty-cart">
                <BsCartX />
                <span>No products in the cart</span>
                <button
                  className="return-cta"
                  onClick={() => navigate("/#products")}
                >
                  RETURN TO SHOP
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="cart-products">
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <div className="cart-product" key={id}>
                      <div className="new">
                        <div className="serial-no">{index + 1}</div>
                        <div className="img-container">
                          <img src={imageURL} alt={name} />
                        </div>
                      </div>
                      <div className="prod-details">
                        <span className="name">{name}</span>
                        {/* <MdDeleteForever className="close-btn" /> */}
                        <div className="prod-details-with-delete">
                          <div className="quantity-buttons">
                            <span onClick={() => decreaseCart(cart)}>-</span>
                            <span>{cartQuantity}</span>
                            <span onClick={() => increaseCart(cart)}>+</span>
                          </div>
                          <MdDeleteForever
                            className="delete-btn"
                            onClick={() => removeFromCart(cart)}
                          />
                        </div>
                        <div className="text">
                          <span>{cartQuantity}</span>
                          <span>X</span>
                          <span className="highlight">&#8377;{price}</span>
                          <span>
                            ={""} ₹{(price * cartQuantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button className="clear-cart" onClick={clearCart}>
                  CLEAR CART
                </button>
              </div>
              <div className="cart-footer">
                <p className="cart-items">
                  Cart item(s): <b>{`${cartTotalQuantity}`}</b>
                </p>
                <div className="subtotal">
                  <span className="text">Subtotal:</span>
                  <span className="text total">
                    &#8377;{cartTotalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="button">
                  <button className="checkout-cta">CHECKOUT</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
