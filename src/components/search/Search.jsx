import { BiSearch } from "react-icons/bi";
import "./Search.scss";
const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <BiSearch size={18} className="icon" />
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
