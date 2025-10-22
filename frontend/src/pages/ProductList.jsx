import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    title: "",
    description: "",
    price: "",
    categories: "",
  });
  const [toggleEdit, setToggleEdit] = useState(false);

  const category = ["clothes", "gadgets", "makeup", "electronics","footware", "others"];

  // handle input changes
  function handleChange(key, value) {
    setSelectedProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // Add or Update Product
  async function handleAddProduct(e) {
    e.preventDefault();

    try {
      if (toggleEdit && selectedProduct._id) {
        const res = await axios.put(
          `http://localhost:3000/api/product/${selectedProduct._id}`,
          {
            title: selectedProduct.title,
            description: selectedProduct.description,
            price: selectedProduct.price,
            categories: selectedProduct.categories,
          }
        );
        toast.success(res.data.message);
        setToggleEdit(false); // 👈 hide form after update
      } else {
        const res = await axios.post("http://localhost:3000/api/product", {
          title: selectedProduct.title,
          description: selectedProduct.description,
          price: selectedProduct.price,
          categories: selectedProduct.categories,
        });
        toast.success(res.data.message);
      }

      fetchProduct();
      setSelectedProduct({ title: "", description: "", price: "", categories: "" });
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to save product.");
    }
  }

  // Fetch all products
  async function fetchProduct() {
    try {
      const res = await axios.get("http://localhost:3000/api/product");
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  }

  // Delete product
  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:3000/api/product/${id}`);
      toast.success(res.data.message);
      fetchProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  }

  // Edit product
  function handleEdit(x) {
    setSelectedProduct(x);
    setToggleEdit(true);
  }

  // Fetch products on mount
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      {/* Show form only when editing */}
      {toggleEdit && (
        <form onSubmit={handleAddProduct} className="product-form">
          <h2>Edit Product</h2>

          <input
            type="text"
            placeholder="Enter Title"
            value={selectedProduct.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Product Description"
            value={selectedProduct.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter Price"
            value={selectedProduct.price}
            onChange={(e) => handleChange("price", e.target.value)}
            required
          />
          <select
            value={selectedProduct.categories}
            onChange={(e) => handleChange("categories", e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {category.map((x, i) => (
              <option key={i} value={x}>
                {x.toUpperCase()}
              </option>
            ))}
          </select>

          <div style={{ marginTop: "10px" }}>
            <button type="submit">Update Product</button>
            <button
              type="button"
              onClick={() => setToggleEdit(false)}
              style={{ marginLeft: "10px", backgroundColor: "#ccc" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((x) => (
          <div key={x._id} className="product-card">
            <div className="product-img">
              <img
                src={x.image || "https://via.placeholder.com/150"}
                alt={x.title}
              />
            </div>
            <h3 className="product-title">{x.title}</h3>
            <p className="product-desc">{x.description}</p>
            <div className="product-info">
              <span className="price">${x.price}</span>
              <span className="category">{x.categories}</span>
            </div>
            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEdit(x)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(x._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
