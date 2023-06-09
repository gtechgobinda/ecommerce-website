import { useState } from "react";
import Card from "../../card/Card";
import "./AddProduct.scss";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: null,
    category: "",
    brand: "",
    desc: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {};

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };
  return (
    <>
      <div className="product">
        <h1>Add New Product</h1>
        <Card cardClass="card">
          <form className="form" onSubmit={addProduct}>
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
              <div className="progress">
                <div className="progress-bar">Uploading 50%</div>
              </div>
              <input
                type="file"
                placeholder="Product Image"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              <input
                type="text"
                name="imageURL"
                placeholder="Image URL"
                value={product.imageURL}
                disabled
                // required
              />
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
            <button>Save Product</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
