import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import { Footer, Header, ProductDetails } from "./components";
//pages
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import {
  Admin,
  Cart,
  Checkout,
  CheckoutSuccess,
  Contact,
  Home,
  Login,
  OrderDetails,
  Register,
  Reset,
} from "./pages";
import CheckoutDeatils from "./pages/checkout/checkoutDetails/CheckoutDeatils";
import OrderHistory from "./pages/orderHistory/OrderHistory";
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDeatils />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
