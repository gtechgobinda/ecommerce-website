import useFetchCollection from "../../customHooks/useFetchCollection";
import "./OrderHistory.scss";
const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  console.log(data);
  return (
    <>
      <div>OrderHistory</div>
    </>
  );
};

export default OrderHistory;
