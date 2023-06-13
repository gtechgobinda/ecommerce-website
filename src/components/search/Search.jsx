import { useState } from "react";
import { MdClose } from "react-icons/md";
import prod from "../../assets/earbuds-prod-1.webp";
import "./Search.scss";
// eslint-disable-next-line react/prop-types
const Search = ({ setShowSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="search-model">
        <div className="form-field">
          <input
            type="text"
            autoFocus
            placeholder="Search for products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <MdClose /> */}
          <MdClose onClick={() => setShowSearch(false)} />
        </div>
        <div className="search-result-content">
          <div className="search-results">
            <div className="search-result-item">
              <div className="img-container">
                <img src={prod} alt="" />
              </div>
              <div className="prod-details">
                <span className="name">product name</span>
                <span className="desc">product desc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
