import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductById = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await response.json();
      setProduct(result);
    };
    getProductById();
  }, [id]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        
        {/* Full Screen Image */}
        <div className="bg-white flex items-center justify-center p-10 h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white p-10 overflow-y-auto">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

            {/* Category */}
            <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 text-sm rounded-full">
              {product.category}
            </span>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Buttons */}
            <div className="pt-4 space-y-3">
              <button
                disabled={product.stock === 0}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                  product.stock > 0
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
