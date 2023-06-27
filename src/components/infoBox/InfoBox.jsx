import "./InfoBox.scss";

const InfoBox = ({ title, count, icon }) => {
  return (
    <>
      <div className="info-box-container">
        <div className="info-box-cart">
          <h4 className="info-box-title">{title}</h4>
          <span className="info-box-desc">
            <h3>{count}</h3>
            <p className="icon">{icon}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default InfoBox;
