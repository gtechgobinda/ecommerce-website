import { Banner, MiniNavbar, Product } from "../../components";
// import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <MiniNavbar />
      <Banner />
      <Product />
    </>
  );
};

export default Home;
