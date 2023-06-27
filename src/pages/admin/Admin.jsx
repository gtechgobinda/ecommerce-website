import { Route, Routes } from "react-router-dom";
import {
  AddProduct,
  Home,
  Navbar,
  OrderDetails,
  Orders,
  ViewProducts,
} from "../../components";

import "./Admin.scss";
const Admin = () => {
  return (
    <>
      <div className="admin">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="all-products" element={<ViewProducts />} />
            <Route path="add-product/:id" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order-details/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
