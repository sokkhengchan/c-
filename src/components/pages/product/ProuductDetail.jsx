import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductById = async () => {
      try {
        setLoading(true);
        // Updated to use Platzi API
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const result = await response.json();
        setProduct(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    getProductById();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        
        {/* Full Screen Image */}
        <div className="bg-white flex items-center justify-center p-10 h-full">
          <img
            src={product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/600x600/f3f4f6/9ca3af?text=No+Image'}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600/f3f4f6/9ca3af?text=No+Image';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="bg-white p-10 overflow-y-auto">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

            {/* Category */}
            <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 text-sm rounded-full">
              {product.category?.name || product.category || 'No Category'}
            </span>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

            {/* Product Info (since Platzi API doesn't have stock) */}
            <div className="space-y-2">
              {product.id && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Product ID:</span>
                  <span className="text-sm text-gray-900">{product.id}</span>
                </div>
              )}
              
              {product.creationAt && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Created:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(product.creationAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* Availability indicator (since Platzi API doesn't have stock field) */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-green-600">Available</span>
              </div>
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">More Images</h3>
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 2}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=No+Image';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="pt-4 space-y-3">
              <button className="w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 bg-black text-white hover:bg-gray-800">
                Add to Cart
              </button>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all">
                Buy Now
              </button>
            </div>

            {/* API Info */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Data from Platzi FakeAPI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}