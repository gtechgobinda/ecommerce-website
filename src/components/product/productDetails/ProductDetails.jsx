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
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config.js";
import { Loader } from "../../index.js";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState("");
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
                  <span>-</span>
                  <span>5</span>
                  <span>+</span>
                </div>

                <button className="add-to-cart-button">
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
