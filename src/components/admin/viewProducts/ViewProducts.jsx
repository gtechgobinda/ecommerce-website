import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config.js";
import "./ViewProducts.scss";
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="table">
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Products Found </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <>
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{`₹${price}`}</td>
                      <td>
                        <Link to="/admin/add-product">
                          <BiEdit size={20} color="green" />
                        </Link>
                        &nbsp;
                        <MdDeleteForever size={20} color="red" />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
