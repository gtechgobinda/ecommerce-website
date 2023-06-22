import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import { Footer, Header, ProductDetails } from "./components";
//pages
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import { Admin, Cart, Contact, Home, Login, Register, Reset } from "./pages";
import CheckoutDeatils from "./pages/checkout/checkoutDetails/CheckoutDeatils";
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
