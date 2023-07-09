import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../../customHooks/useFetchCollection.jsx";
import { db, storage } from "../../../firebase/config.js";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice.jsx";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice.jsx";
import { Loader, Pagination, Search } from "../../index.js";
import "./ViewProducts.scss";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(10);
  const [productsPerPage] = useState(10);

  //Get Current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "#8e2de2",
        okButtonBackground: "#8e2de2",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="table">
        <h2>All Products</h2>
        <div className="admin-search">
          <p>
            <b>{filteredProducts.length} </b>products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? (
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
              {currentProducts.map((product, index) => {
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
                      <td className="icons">
                        <Link to={`/admin/add-product/${id}`}>
                          <BiEdit size={20} color="green" />
                        </Link>
                        &nbsp;
                        <MdDeleteForever
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(id, imageURL)}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
