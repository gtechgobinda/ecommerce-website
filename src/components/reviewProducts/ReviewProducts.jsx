import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/config";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import "./ReviewProducts.scss";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="review-container">
        <h2 className="review-container-heading">Review Products</h2>
        {product === null ? (
          <img alt="Loading..." />
        ) : (
          <>
            <p className="review-product-name">
              <b>Product name:</b> {product.name}
            </p>
            <div className="review-product-img">
              <img src={product.imageURL} alt={product.name} />
            </div>
          </>
        )}

        <form onSubmit={(e) => submitReview(e)} className="review-form">
          <div className="rating">
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
          </div>
          <div className="review">
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" className="review-submit-button">
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewProducts;
