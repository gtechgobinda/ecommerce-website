import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { HiX } from "react-icons/hi";
import { MdAdminPanelSettings, MdContactSupport } from "react-icons/md";
import { TbLogin, TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dummyDP } from "../../assets";
import { auth } from "../../firebase/config";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";
import { Search } from "../index.js";
import "./Header.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  const dispatch = useDispatch();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const logoutUser = () => {
    setToggle(false);
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  //monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          console.log(uName);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
        if (user.photoURL === null) {
          setProfilePhoto(dummyDP);
        } else {
          setProfilePhoto(user.photoURL);
        }
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleHomeMenu = () => {
    navigate("/");
    setToggle(false);
    scrollToTop();
  };
  const handleMyOrders = () => {
    navigate("/order-history");
    setToggle(false);
    scrollToTop();
  };
  const handleContactMenu = () => {
    navigate("/contact");
    setToggle(false);
    scrollToTop();
  };
  const handleLoginMenu = () => {
    navigate("/login");
    setToggle(false);
  };
  const handleTitle = () => {
    navigate("/");
    scrollToTop();
  };
  const handleCart = () => {
    navigate("/cart");
    scrollToTop();
  };
  const handleContact = () => {
    navigate("/contact");
    scrollToTop();
  };

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={handleTitle}>Home</li>
            <li>About</li>
            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="admin-btn">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>
          </ul>
          <div className="center" onClick={handleTitle}>
            GTECHSTORE.
          </div>
          <div className="right">
            <ShowOnLogin>
              <span className="my-orders-icon-tooltip">
                <FaBoxOpen
                  className="my-orders-icon"
                  onClick={handleMyOrders}
                />
                <p className="tooltip">Orders</p>
              </span>
            </ShowOnLogin>
            <span className="contact-icon-tooltip">
              <MdContactSupport
                onClick={handleContact}
                className="contact-icon"
              />
              <p className="tooltip">Contact</p>
            </span>
            <span className="cart-icon-tooltip">
              <span className="cart-icon-main" onClick={handleCart}>
                <CgShoppingCart className="cart-icon" />
                {cartTotalQuantity === 0 ? null : (
                  <>{<span className="cart-no">{cartTotalQuantity}</span>}</>
                )}
              </span>
              <p className="tooltip">Cart</p>
            </span>
            <ShowOnLogout>
              <span className="login-icon-tooltip">
                <TbLogin
                  className="login-icon"
                  onClick={() => navigate("/login")}
                />
                <p className="tooltip">Login</p>
              </span>
            </ShowOnLogout>
            <ShowOnLogin>
              <span className="logout-icon-tooltip">
                <TbLogout className="logout-icon" onClick={logoutUser} />
                <p className="tooltip">Logout</p>
              </span>
            </ShowOnLogin>
            <div className="navbar-menu">
              <GoThreeBars
                onClick={() => setToggle(true)}
                className="three-bar"
              />
              {toggle && (
                <>
                  <div className="menu">
                    <ul>
                      <li>
                        <HiX
                          onClick={() => setToggle(false)}
                          className="close-btn"
                        />
                      </li>
                      <li>
                        <ShowOnLogin>
                          <div className="profile-photo">
                            <img src={profilePhoto} alt="" />
                            <p>
                              <span>{displayName}</span>
                            </p>
                          </div>
                        </ShowOnLogin>
                      </li>
                      <li>
                        <AdminOnlyLink>
                          <MdAdminPanelSettings />
                          <Link to="/admin/home">
                            <button className="admin-btn">Admin</button>
                          </Link>
                        </AdminOnlyLink>
                      </li>
                      <li onClick={handleHomeMenu}>
                        <AiOutlineHome />
                        Home
                      </li>
                      <ShowOnLogin>
                        <li onClick={handleMyOrders}>
                          <FaBoxOpen />
                          My orders
                        </li>
                      </ShowOnLogin>
                      <li onClick={handleContactMenu}>
                        <MdContactSupport />
                        Contact Us
                      </li>
                      <ShowOnLogout>
                        <li onClick={handleLoginMenu}>
                          <TbLogin />
                          Login
                        </li>
                      </ShowOnLogout>
                      <ShowOnLogin>
                        <li onClick={logoutUser}>
                          <TbLogout />
                          Log Out
                        </li>
                      </ShowOnLogin>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
