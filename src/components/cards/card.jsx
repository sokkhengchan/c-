import { TiStarFullOutline } from "react-icons/ti";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Cards({
  thumbnail,
  category,
  title,
  description,
  price,
  rating,
  stock,
  id
}) {
  return (
    <Link 
      to={`/products/${id}`} 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={thumbnail}
          alt="Product image"
          className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
          {category}
        </span>
        
        {/* Heart Button */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white group">
          <svg
            className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <FaStarHalfStroke className="w-4 h-4" />
          </div>
          <span className="text-gray-500 text-sm font-medium">({rating}/5)</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {description}
        </p>

        {/* Price */}
        <div className="text-2xl font-bold text-gray-900 mb-4">
          ${price}
        </div>

        {/* Stock Status */}
        <div className="flex items-center mb-5">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            stock > 0 ? "bg-emerald-500" : "bg-red-500"
          }`}></div>
          <span className={`text-sm font-medium ${
            stock > 0 ? "text-emerald-600" : "text-red-600"
          }`}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              stock > 0
                ? "bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={stock === 0}
            onClick={(e) => e.preventDefault()}
          >
            <FaCartPlus className="w-4 h-4" />
            Add to Cart
          </button>

          <button 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={(e) => e.preventDefault()}
          >
            Buy Now
          </button>
        </div>

        {/* Features */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-indigo-600 text-xs">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Free shipping • 30-day return
          </div>
        </div>
      </div>
    </Link>
  );
}