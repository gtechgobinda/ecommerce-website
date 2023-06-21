import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART } from "../../../redux/slice/cartSlice";
import "./ProductItem.scss";
const ProductItem = ({ product, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickProduct = () => {
    navigate(`/product-details/${id}`);
  };

  const addToCart = () => {
    dispatch(ADD_TO_CART(product));
  };
  return (
    <>
      <div className="product-card">
        <div className="thumbnail">
          <img src={imageURL} alt="" onClick={onClickProduct} />
        </div>
        <div className="prod-details">
          <span className="name">{name}</span>
          <span className="price">&#8377;{price}</span>
        </div>
        <button className="addToCartButton" onClick={() => addToCart(product)}>
          Add To Cart
        </button>
      </div>
    </>
  );
};

export default ProductItem;
