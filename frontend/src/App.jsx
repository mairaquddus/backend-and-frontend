import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProduct />} />
        <Route path="/product" element={<ProductList/>} />
         <Route path="/user" element={<Login/>} />
      </Routes>
    </Router>
  );
}
