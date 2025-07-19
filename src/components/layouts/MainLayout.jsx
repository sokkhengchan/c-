// MainLayout.jsx (probably what you have)
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "../footers/footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}