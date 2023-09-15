import "./StripeTestCard.scss";
const StripeTestCard = () => {
  return (
    <div className="container">
      <p className="disclaimer">
        <p>Use This Stripe Test Card to make this payment.</p>
        <p>
          Tap on card to view <span>CVV</span>
        </p>
      </p>
      <div className="card">
        <div className="card-inner">
          <div className="front">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
            <div className="row">
              <img
                src="https://i.ibb.co/G9pDnYJ/chip.png"
                width="60px"
                className="chip-img"
              />
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
            </div>
            <div className="row card-no">
              <p>4242</p>
              <p>4242</p>
              <p>4242</p>
              <p>4242</p>
            </div>
            <div className="row card-holder">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
            </div>
            <div className="row name">
              <p>YOUR NAME</p>
              <p>11 / 29</p>
            </div>
          </div>
          <div className="back">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
            <div className="bar"></div>
            <div className="row card-cvv">
              <div className="card-cvv-pattern">
                <img src="https://i.ibb.co/S6JG8px/pattern.png" />
              </div>
              <p>824</p>
            </div>
            <div className="row card-text">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeTestCard;
