import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config.js";
import { selectProducts } from "../../../redux/slice/productSlice.jsx";
import Card from "../../card/Card";
import { Loader } from "../../index.js";
import "./AddProduct.scss";

const categories = [
  { id: 1, name: "headphones" },
  { id: 2, name: "wireless earbuds" },
  { id: 3, name: "bluetooth speakers" },
  { id: 4, name: "smart watches" },
];
const initailState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};
const AddProduct = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initailState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `gtechstore/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image upload successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initailState });
      toast.success("Product uploaded successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="product">
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass="card">
          <form
            className="form"
            onSubmit={detectForm(id, addProduct, editProduct)}
          >
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="Product Name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Image:</label>
            <Card cardClass="group">
              {uploadProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              {detectForm(
                id,
                <input
                  type="file"
                  placeholder="Product Image"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                  required
                />,
                <input
                  type="file"
                  placeholder="Product Image"
                  accept="image/*"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
              )}

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  name="imageURL"
                  placeholder="Image URL"
                  value={product.imageURL}
                  disabled
                  required
                />
              )}
            </Card>
            <label>Product Price:</label>
            <input
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- Choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company/Brand</label>
            <input
              type="text"
              placeholder="Product Brand"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Description</label>
            <textarea
              name="desc"
              value={product.desc}
              required
              cols="30"
              rows="10"
              onChange={(e) => handleInputChange(e)}
            ></textarea>
            <button>{detectForm(id, "Save Product", "Edit Product")}</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
