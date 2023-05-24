import { useEffect, useState } from "react";
// import { AiOutlineHeart} from "react-icons/ai";
import { signOut } from "firebase/auth";
import { AiOutlineHome } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { HiX } from "react-icons/hi";
import { MdContactSupport } from "react-icons/md";
import { TbLogin, TbLogout, TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import "./Header.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li>Home</li>
            <li>About</li>
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            GTECHSTORE.
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <FaBoxOpen className="my-orders-icon" />
            {/* <AiOutlineHeart className="favourite-icon" /> */}
            <MdContactSupport onClick={() => navigate("/contact")} />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {<span>5</span>}
            </span>
            <TbLogin
              className="login-icon"
              onClick={() => navigate("/login")}
            />
            <div className="navbar-menu">
              <GoThreeBars onClick={() => setToggle(true)} />
              {toggle && (
                <>
                  <div className="menu">
                    <HiX onClick={() => setToggle(false)} />
                    <ul>
                      <li onClick={() => navigate("/")}>
                        <AiOutlineHome />
                        Home
                      </li>
                      <li onClick={() => navigate("/order-history")}>
                        <FaBoxOpen />
                        My orders
                      </li>
                      <li onClick={() => navigate("/contact")}>
                        <MdContactSupport />
                        Contact Us
                      </li>
                      {/* <li>
                        <AiOutlineHeart />
                        Favourite
                      </li> */}

                      <li onClick={() => navigate("/login")}>
                        <TbLogin />
                        Login
                      </li>
                      <li onClick={logoutUser}>
                        <TbLogout />
                        Log Out
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
