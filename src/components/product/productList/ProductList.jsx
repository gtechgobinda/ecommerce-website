import { BsFillCaretDownFill } from "react-icons/bs";
import { ProductFilter, ProductItem } from "../../index.js";
import "./ProductList.scss";

const ProductList = ({ products }) => {
  return (
    <>
      <hr className="hr" />
      <header className="mini-navbar">
        <div className="navbar-content">
          <div className="left">
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
          </div>
          <div className="right">
            <div className="sort">
              <label>Sort by:</label>
              <select>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-z">A - Z</option>
              </select>
            </div>
          </div>
        </div>
      </header>
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
