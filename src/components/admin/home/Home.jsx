import { BiRupee } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import InfoBox from "../../infoBox/InfoBox";
import "./Home.scss";

//Icons
const earningIcon = <BiRupee color="black" size={25} />;
const productIcon = <GrCart color="black" size={25} />;
const ordersIcon = <FaCartArrowDown color="black" size={25} />;
const Home = () => {
  return (
    <>
      <div className="admin-home-container">
        <div className="info-box1">
          <InfoBox title={"Earning"} count={`₹50000`} icon={earningIcon} />
        </div>
        <div className="info-box2">
          <InfoBox title={"Products"} count={`188`} icon={productIcon} />
        </div>
        <div className="info-box3">
          <InfoBox title={"Orders"} count={`18`} icon={ordersIcon} />
        </div>
      </div>
    </>
  );
};

export default Home;
