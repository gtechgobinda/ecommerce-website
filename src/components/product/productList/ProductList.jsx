import { ProductItem } from "../../index.js";
import "./ProductList.scss";

const ProductList = ({ products }) => {
  return (
    <>
      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <>
          {products.map((product) => {
            return (
              <>
                <ProductItem {...product} product={product} key={product.id} />
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default ProductList;
