import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice.jsx";
import useFetchCollection from "../customHooks/useFetchCollection.jsx";
import { Loader, ProductList } from "../index.js";
import "./Product.scss";
const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="products-container">
            <div className="products">
              <ProductList products={products} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
