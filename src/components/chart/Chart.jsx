import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import "./Chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);
  //Create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });
  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };
  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered...",
  ];
  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);
  const data = {
    labels: ["Places Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "#8E2DE2",
      },
    ],
  };
  return (
    <>
      <div className="chart">
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default Chart;
