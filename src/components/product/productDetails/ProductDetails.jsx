import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  FaCartPlus,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config.js";
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

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Product not found");
    }
  };
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
          <div className="single-product-page">
            <div className="left">
              {product === "" ? (
                <Loader />
              ) : (
                <img src={product.imageURL} alt={product.name} />
              )}
            </div>
            <div className="right">
              <span className="name">{product.name}</span>
              <span className="price">{product.price}</span>
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
                <span className="text-bold">
                  Share:
                  <span className="social-icons">
                    <FaFacebookF size={16} />
                    <FaTwitter size={16} />
                    <FaInstagram size={16} />
                    <FaLinkedinIn size={16} />
                    <FaPinterest size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
