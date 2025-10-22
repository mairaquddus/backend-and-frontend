import React, { useRef, useState } from "react";
import axios from "axios";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct() {
  const [product, setProduct] = useState();
  const category = ["clothes", "gadgets", "makeup", "electronics","footware", "others"];

  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoriesRef = useRef();
  const priceRef = useRef();

  async function handleAddProduct(e) {
    e.preventDefault();
    const newProduct = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: Number(priceRef.current.value),
      categories: categoriesRef.current.value,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/product", newProduct);
      console.log("Product created:", res.data);
      toast.success(res.data.message || "Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="form-card">
        <h2 className="form-title">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input type="text" placeholder="Enter Title" ref={titleRef} />
          <input
            type="text"
            placeholder="Enter Product Description"
            ref={descriptionRef}
          />
          <input type="number" placeholder="Enter Price" ref={priceRef} />

          <select ref={categoriesRef}>
            <option value="">Select Category</option>
            {category.map((x, i) => (
              <option key={i} value={x}>
                {x.toUpperCase()}
              </option>
            ))}
          </select>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
