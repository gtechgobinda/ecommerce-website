import { useEffect } from "react";
import { Banner, MiniNavbar, Product } from "../../components";
// import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import "./Home.scss";
const Home = () => {
  const url = window.location.href;
  // console.log(url);

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 530,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <>
      <MiniNavbar />
      <Banner />
      <Product />
    </>
  );
};

export default Home;
