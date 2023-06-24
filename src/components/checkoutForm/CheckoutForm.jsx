import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import "./CheckoutForm.scss";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);
  const saveOrder = () => {
    console.log("Order Saved");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/checkout-success",
        },
        redirect_url: "if_required",
      })
      .then((result) => {
        //ok - payment bad-error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("payment successful");
            saveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="checkout-container-main">
        <h2>CHECKOUT</h2>
        <div className="checkout-container-display">
          <div className="checkout-summary">
            <CheckoutSummary />
          </div>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-pay">
              <h3 className="checkout-pay-h3">Stripe payment</h3>
              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="paynow-button"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
