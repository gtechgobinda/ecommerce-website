import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import "./ProductFilter.scss";
const ProductFilter = () => {
  const [toggle, setToogle] = useState(false);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  console.log(allBrands);
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
    setToogle(false);
  };
  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
    setToogle(false);
  };
  const handleBrand = (e) => {
    setToogle(false);
    setBrand(e.target.value);
  };
  return (
    <>
      <ul>
        <li>
          <div className="filter">
            <p onClick={() => setToogle(true)}>FILTER</p>
            {toggle === true ? (
              <AiFillCaretUp onClick={() => setToogle(false)} />
            ) : (
              <AiFillCaretDown onClick={() => setToogle(true)} />
            )}
          </div>
          <div className="filter-dropdown">
            {toggle && (
              <>
                <div className="filter-dropdown-grid">
                  <div className="filter-dropdown-grid-child child1">
                    <h4>CATEGORIES</h4>
                    <div className="category">
                      {allCategories.map((cat, index) => {
                        return (
                          <>
                            <button
                              key={index}
                              type="button"
                              // className={
                              //   `${category}` === cat ? `${active}` : null
                              // }
                              onClick={() => filterProducts(cat)}
                            >
                              {cat}
                            </button>
                          </>
                        );
                      })}
                      {/* <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {allCategories.map((cat, index) => {
                          return (
                            <>
                              <option
                                key={index}
                                value={cat}
                                onClick={() => filterProducts(cat)}
                              >
                                {cat}
                              </option>
                            </>
                          );
                        })}
                      </select> */}
                    </div>
                  </div>
                  <div className="filter-dropdown-grid-child child2">
                    <h4>BRAND</h4>
                    <select
                      value={brand}
                      // onChange={(e) => setBrand(e.target.value)}
                      onChange={handleBrand}
                    >
                      {allBrands.map((brand, index) => {
                        return (
                          <>
                            <option key={index} value={brand}>
                              {brand}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="filter-dropdown-grid-child child3">
                    <h4>PRICE</h4>
                    <div className="price">
                      <p>{`₹${price}`}</p>
                      <input
                        type="range"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min={minPrice}
                        max={maxPrice}
                        className="slider"
                      />
                    </div>
                  </div>
                  <div className="filter-action-button" onClick={clearFilters}>
                    <button>CLEAR</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProductFilter;
