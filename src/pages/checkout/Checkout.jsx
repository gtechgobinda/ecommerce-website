import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckoutForm, Loader } from "../../components";
import { selectEmail } from "../../redux/slice/authSlice";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
const stripePromise = loadStripe(import.meta.env.VITE_REACT_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializng Checkout");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY);
    dispatch(CALCULATE_SUBTOTAL);
  }, [dispatch, cartItems]);

  const description = `gtechstore payment: email:${customerEmail},Amount:${totalAmount}`;
  useEffect(() => {
    setIsLoading(true);
    fetch("https://gtechstore-backend.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section>
            <div className="container">
              {!clientSecret && <h3>{message}</h3>}
            </div>
          </section>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
