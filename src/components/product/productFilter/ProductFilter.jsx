import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./ProductFilter.scss";
const ProductFilter = () => {
  const [toggle, setToogle] = useState(false);
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
                      <button>All</button>
                      <button>Headphones</button>
                      <button>Speakers</button>
                      <button>Watches</button>
                    </div>
                  </div>
                  <div className="filter-dropdown-grid-child child2">
                    <h4>BRAND</h4>
                    <select name="brand">
                      <option value="boat">boat</option>
                      <option value="samsung">samsung</option>
                      <option value="sony">sony</option>
                      <option value="realme">realme</option>
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
