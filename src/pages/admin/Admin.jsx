import { Route, Routes } from "react-router-dom";
import { Orders, ViewProducts } from "../../components";
import Navbar from "../../components/admin/navbar/Navbar";
import Home from "../home/Home";
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
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
