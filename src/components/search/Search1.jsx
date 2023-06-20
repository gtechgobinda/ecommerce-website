import { BiSearch } from "react-icons/bi";
import "./Search1.scss";
const Search1 = ({ value, onChange }) => {
  return (
    <div className="search1">
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

export default Search1;
