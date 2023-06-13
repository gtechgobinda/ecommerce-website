import { BsFillCaretDownFill } from "react-icons/bs";
import { ProductFilter } from "../index.js";
import "./MiniNavbar.scss";
const MiniNavbar = () => {
  return (
    <>
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
        </div>
      </header>
      <hr />
    </>
  );
};

export default MiniNavbar;
