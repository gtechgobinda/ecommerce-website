import { useNavigate } from "react-router-dom";
import "./ProductItem.scss";
const ProductItem = ({ product, id, name, price, desc, imageURL }) => {
  const navigate = useNavigate();
  const onClickProduct = () => {
    navigate("/product-details");
  };
  const shortenText = (text, n) => {
    if (text.length > 15) {
      const shortenedText = text.substring(0, 15).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <>
      <div className="product-card">
        <div className="thumbnail">
          <img src={imageURL} alt="" onClick={onClickProduct} />
        </div>
        <div className="prod-details">
          <span className="name">{shortenText(name, 18)}</span>
          <span className="price">&#8377;{price}</span>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
