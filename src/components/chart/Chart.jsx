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
  const placed = 2;
  const processing = 2;
  const shipped = 2;
  const delivered = 8;
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
