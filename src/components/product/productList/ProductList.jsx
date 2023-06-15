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
                <div className="products-container">
                  <div key={product.id} className="products">
                    <ProductItem {...product} product={product} />
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default ProductList;
