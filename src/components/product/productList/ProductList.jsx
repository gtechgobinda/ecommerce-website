import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice.jsx";
import { ProductFilter, ProductItem, Search1 } from "../../index.js";
import "./ProductList.scss";

const ProductList = ({ products }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);
  return (
    <>
      <hr className="hr" />
      <header className="mini-navbar">
        <div className="navbar-content">
          {/* <div className="left">
            <ul className="left-ul">
              <li>All</li>
              <li>Headphones</li>
              <li>Earbuds</li>
              <li>Speakers</li>
              <li>Watchs</li>
            </ul>
            <div className="product-filter">
              <ProductFilter />
              <BsFillCaretDownFill />
            </div>
          </div> */}
          <div className="left">
            <ProductFilter />
          </div>
          <div className="middle">
            <Search1
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="right">
            <div className="sort">
              <label>Sort by:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <p className="foundProduct">
        <b>{filteredProducts.length}</b> Products found.
      </p>
      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <>
          {filteredProducts.map((product) => {
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
