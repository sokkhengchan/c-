import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Navbar from "./components/layouts/navbar";
import Footer from "./components/footers/footer";
import Cards from "./components/cards/card";
import SearchBar from "./components/layouts/SearchBar";
import { getData } from "./api/api";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products based on category
  useEffect(() => {
    const url =
      category === "all"
        ? "https://api.escuelajs.co/api/v1/products"
        : `https://api.escuelajs.co/api/v1/products/?categoryId=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Platzi API returns array directly, not wrapped in 'products'
        const productsArray = Array.isArray(data) ? data : [];
        setAllProducts(productsArray);
        setProducts(productsArray);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  // Handle search
  const handleSearch = (search) => {
    setSearchTerm(search);
    if (search === "") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const categories = ["all", 1, 2, 3, 4, 5,6]; // Platzi API uses category IDs
  const categoryNames = {
    "all": "All",
    1: "Clothes", 
    2: "Electronics",
    3: "Furniture", 
    4: "Shoes",
    5: "Beauty",
    6: "Others"
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Header with Search Bar and Create Product Button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
            
            {/* Create Product Button */}
            <Link 
              to="/create-product"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Product
            </Link>
          </div>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-blue-500 border border-gray-300 hover:bg-indigo-50 hover:border-indigo-300"
                }`}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Cards
              key={product.id}
              title={product.title}
              description={product.description}
              category={product.category?.name || product.category}
              price={product.price}
              stock={product.stock || "In Stock"}
              thumbnail={product.images?.[0] || product.thumbnail}
              rating={product.rating || 4.5}
              id={product.id}
            />
          ))}
        </section>

        {/* No products found message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 mb-4">
              <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">No products found</h3>
            <p className="text-gray-400">
              {searchTerm ? `No products match "${searchTerm}"` : "No products available in this category"}
            </p>
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Products count */}
        {products.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              {searchTerm && ` for "${searchTerm}"`}
              {category !== "all" && ` in ${categoryNames[category]}`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;