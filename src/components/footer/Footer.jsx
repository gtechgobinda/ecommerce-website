import { FaEnvelope, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import Payment from "../../assets/payments.png";
import "./Footer.scss";
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="col">
            <div className="title">About</div>
            <div className="text about-text">
              At GTECHSTORE, we're your one-stop destination for the latest and
              greatest in tech products. We understand that technology is
              constantly evolving, and we're here to help you stay ahead of the
              curve.
            </div>
          </div>
          <div className="col">
            <div className="title">Contact</div>
            <div className="c-item">
              <FaLocationArrow />
              <div className="text">
                Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha, Kerala,
                688006
              </div>
            </div>
            <div className="c-item">
              <FaMobileAlt />
              <div className="text">Phone: 0471 272 0261</div>
            </div>
            <div className="c-item">
              <FaEnvelope />
              <div className="text">Email: store@gtech.com</div>
            </div>
          </div>
          <div className="col">
            <div className="title">Categories</div>
            <span className="text">Headphones</span>
            <span className="text">Smart Watches</span>
            <span className="text">Bluetooth Speakers</span>
            <span className="text">Wireless Earbuds</span>
          </div>
          <div className="col">
            <div className="title">Pages</div>
            <span className="text">Home</span>
            <span className="text">About</span>
            <span className="text">Returns</span>
            <span className="text">Terms & Conditions</span>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="bottom-bar-content">
            <span className="text">
              GTECHSTORE {year} CREATED BY GTECHGOBINDA. PREMIUM E-COMMERCE
              SOLUTIONS.
            </span>
            <img src={Payment} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
