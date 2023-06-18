import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
} from "../../../redux/slice/filterSlice";
import { selectProducts } from "../../../redux/slice/productSlice";
import "./ProductFilter.scss";
const ProductFilter = () => {
  const [toggle, setToogle] = useState(false);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const products = useSelector(selectProducts);
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

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };
  return (
    <>
      <ul>
        <li>
          <div className="filter">
            <p>FILTER</p>
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
                    </div>
                  </div>
                  <div className="filter-dropdown-grid-child child2">
                    <h4>BRAND</h4>
                    <select
                      name={brand}
                      onChange={(e) => setBrand(e.target.value)}
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
                      <p>1200</p>
                      <input type="range" />
                    </div>
                  </div>
                  <div className="filter-action-button">
                    <button>CLEAR</button>
                    <button>APPLY</button>
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
