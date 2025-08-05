import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/pages/About.jsx";
import Service from "./components/pages/service.jsx";
import Contact from "./components/pages/Contact.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import ErrorBoundary from "./components/errors/ErrorBoundary.jsx";
import ProductDetail from "./components/pages/product/ProuductDetail.jsx";
import Product from "./components/pages/product/Product.jsx";
import CreateProduct from "./components/pages/product/CreateProduct.jsx"; // Add this import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<App/>}/>
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<Product/>}/>
          <Route path="products/:id" element={<ProductDetail/>}/>
          <Route path="create-product" element={<CreateProduct/>}/> {/* Add this route */}
          <Route path="*" element={<ErrorBoundary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);