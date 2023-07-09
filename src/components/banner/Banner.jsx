import BannerImg from "../../assets/banner-img.png";
import "./Banner.scss";
const Banner = () => {
  const scrollToProducts = () => {
    window.scrollTo({ top: 600, behavior: "smooth" });
  };
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Convallis interdum purus adipiscing dis parturient posuere ac a quam
            a eleifend montes parturient posuere curae tempor
          </p>
          <div className="ctas">
            <div className="banner-cta">Read More</div>
            <div className="banner-cta v2" onClick={scrollToProducts}>
              Shop Now
            </div>
          </div>
        </div>
        <img src={BannerImg} alt="" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
