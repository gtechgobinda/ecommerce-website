import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import "./Navbar.scss";

const Navbar = () => {
  const userName = useSelector(selectUserName);
  return (
    <>
      <div className="navbar">
        <div className="user">
          <FaUserCircle size={50} />
          <h4>{userName}</h4>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/admin/all-products">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/admin/add-product/ADD">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders">Orders</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
