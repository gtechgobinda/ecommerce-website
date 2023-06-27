import { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import InfoBox from "../../infoBox/InfoBox";
import "./Home.scss";

//Icons
const earningIcon = <BiRupee color="black" size={25} />;
const productIcon = <GrCart color="black" size={25} />;
const ordersIcon = <FaCartArrowDown color="black" size={25} />;
const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);
  return (
    <>
      <div className="admin-home-container">
        <div className="info-box1">
          <InfoBox
            title={"Earning"}
            count={`₹${totalOrderAmount}`}
            icon={earningIcon}
          />
        </div>
        <div className="info-box2">
          <InfoBox
            title={"Products"}
            count={products.length}
            icon={productIcon}
          />
        </div>
        <div className="info-box3">
          <InfoBox title={"Orders"} count={orders.length} icon={ordersIcon} />
        </div>
      </div>
    </>
  );
};

export default Home;
