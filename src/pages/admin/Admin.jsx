import { Route, Routes } from "react-router-dom";
import {
  AddProduct,
  Home,
  Navbar,
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
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
