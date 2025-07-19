import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/pages/About.jsx";
import Service from "./components/pages/service.jsx";
import Contact from "./components/pages/Contact.jsx";
import Signup from "./api/auth/Signup.jsx";
import Login from "./api/auth/Login.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import ErrorBoundary from "./components/errors/ErrorBoundary.jsx";
import ProductDetail from "./components/pages/product/ProuductDetail.jsx";
import Product from "./components/pages/product/Product.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<App/>}/>
          <Route path="about" element={<About />} /> {/* Removed leading slash */}
          <Route path="service" element={<Service />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<Product/>}/>
          <Route path="products/:id" element={<ProductDetail/>}/>
          <Route path="*" element={<ErrorBoundary />} /> {/* Only one catch-all route */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);