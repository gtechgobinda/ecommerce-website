import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import "./CheckoutDetails.scss";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDeatils = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingAddress);
    console.log(billingAddress);
  };
  return (
    <>
      <div className="checkout-container">
        <h2 className="checkout-heading">CHECKOUT DETAILS</h2>
        <form onSubmit={handleSubmit}>
          <div className="shipping-address">
            <h3>Shipping Address:</h3>
            <label>Recipient Name</label>
            <input
              type="text"
              placeholder="Recipient Name"
              name="name"
              value={shippingAddress.name}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              name="line1"
              value={shippingAddress.line1}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              name="line2"
              value={shippingAddress.line2}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>City:</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={shippingAddress.city}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>State:</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={shippingAddress.state}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              name="postal_code"
              value={shippingAddress.postal_code}
              onChange={(e) => handleShipping(e)}
              required
            />
            <label>Country:</label>
            <CountryDropdown
              classes="select"
              valueType="short"
              value={shippingAddress.country}
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
            />
            <label>Phone:</label>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={shippingAddress.phone}
              onChange={(e) => handleShipping(e)}
              required
            />
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <p>Billing and shipping address same?</p>
          </div>
          <div className="billing-address">
            <h3>Billing Address:</h3>
            <label>Recipient Name</label>
            <input
              type="text"
              placeholder="Recipient Name"
              name="name"
              value={billingAddress.name}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              name="line1"
              value={billingAddress.line1}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              name="line2"
              value={billingAddress.line2}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>City:</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={billingAddress.city}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>State:</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={billingAddress.state}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              name="postal_code"
              value={billingAddress.postal_code}
              onChange={(e) => handleBilling(e)}
              required
            />
            <label>Country:</label>
            <CountryDropdown
              classes="select"
              valueType="short"
              value={billingAddress.country}
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
            />
            <label>Phone:</label>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={billingAddress.phone}
              onChange={(e) => handleBilling(e)}
              required
            />
          </div>
          <button className="proceed-button" type="submit">
            Proceed to Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutDeatils;
