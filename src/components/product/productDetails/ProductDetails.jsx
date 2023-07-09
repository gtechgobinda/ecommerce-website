import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import useFetchCollection from "../../../customHooks/useFetchCollection.jsx";
import useFetchDocument from "../../../customHooks/useFetchDocument.jsx";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice.jsx";
import { Loader } from "../../index.js";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });
  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  return (
    <>
      <div className="single-product-main-content">
        <div className="layout">
          <div className="heading">
            <h2>Product Details</h2>
            <Link to="/#products">
              <BiArrowBack />
              Back to Products
            </Link>
          </div>
          {product === null ? (
            <Loader />
          ) : (
            <div className="single-product-page">
              <div className="left">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="right">
                <span className="name">{product.name}</span>
                <span className="price">₹{product.price}</span>
                <span className="desc">{product.desc}</span>

                <div className="cart-buttons">
                  <div className="quantity-buttons">
                    {isCartAdded < 0 ? null : (
                      <>
                        <span onClick={() => decreaseCart(product)}>-</span>
                        <span>{cart.cartQuantity}</span>
                        <span onClick={() => increaseCart(product)}>+</span>
                      </>
                    )}
                  </div>

                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    <FaCartPlus size={20} />
                    ADD TO CART
                  </button>
                </div>
                <span className="divider" />
                <div className="info-item">
                  <span className="text-bold">
                    Brand:
                    <span>{product.brand}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="review-container">
            <h3 className="review-heading">Product Reviews</h3>

            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <>
                      <div className="review-main" key={index}>
                        <StarsRating value={rate} />
                        <div className="review-desc">
                          <p className="review">{review}</p>
                          <span>
                            <b>Review Date: </b>
                            {reviewDate}
                          </span>
                          <span>
                            <b>by: </b>
                            {userName}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
