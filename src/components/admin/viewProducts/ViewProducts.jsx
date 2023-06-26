import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../../customHooks/useFetchCollection.jsx";
import { db, storage } from "../../../firebase/config.js";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice.jsx";
import { Loader } from "../../index.js";
import "./ViewProducts.scss";

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  // useEffect(() => {
  //   getProducts();
  // }, []);
  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (snapshot) => {
  //       // console.log(snapshot.docs);
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(allProducts);
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //     console.error(error);
  //   }
  // };

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
      </div>
    </>
  );
};

export default ViewProducts;
