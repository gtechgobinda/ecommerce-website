import { useNavigate } from "react-router-dom";
import "./ProductItem.scss";
const ProductItem = ({ product, id, name, price, desc, imageURL }) => {
  const navigate = useNavigate();
  const onClickProduct = () => {
    navigate(`/product-details/${id}`);
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
        <button className="addToCartButton">Add To Cart</button>
      </div>
    </>
  );
};

export default ProductItem;
