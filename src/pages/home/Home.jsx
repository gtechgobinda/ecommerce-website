import { useEffect } from "react";
import { Banner, Product } from "../../components";
import "./Home.scss";
const Home = () => {
  const url = window.location.href;
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
      <Banner />
      <Product />
    </>
  );
};

export default Home;
