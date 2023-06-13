import { Banner, MiniNavbar } from "../../components";
// import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <MiniNavbar />
      <Banner />
      <h1>Home Page</h1>
      {/* <AdminOnlyRoute /> */}
    </>
  );
};

export default Home;
