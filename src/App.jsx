import { useEffect, useState } from "react";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Navbar from "./components/layouts/navbar";
import Footer from "./components/footers/footer";
import Cards from "./components/cards/card";
import SearchBar from"./components/layouts/SearchBar";
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
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products || []);
        setProducts(data.products || []);
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

  const categories = ["all", "beauty", "fragrances", "furniture", "groceries"];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
              category={product.category}
              price={product.price}
              stock={product.stock}
              thumbnail={product.thumbnail}
              rating={product.rating}
              id={product.id}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
