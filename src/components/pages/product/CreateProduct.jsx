import React, { useState, useEffect } from 'react';

// Enhanced validation function
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.title) {
    errors.title = "Product title is required";
  } else if (formData.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (formData.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  
  if (!formData.price) {
    errors.price = "Price is required";
  } else if (parseFloat(formData.price) <= 0) {
    errors.price = "Price must be greater than 0";
  } else if (parseFloat(formData.price) > 999999) {
    errors.price = "Price is too high";
  }
  
  if (!formData.description) {
    errors.description = "Description is required";
  } else if (formData.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (formData.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }
  
  if (!formData.categoryId) {
    errors.categoryId = "Please select a category";
  }
  
  if (!formData.images[0]) {
    errors.images = "Image URL is required";
  } else {
    try {
      new URL(formData.images[0]);
    } catch {
      errors.images = "Please enter a valid URL";
    }
  }
  
  return errors;
};

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ['']
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        if (response.ok) {
          const data = await response.json();
          
          // Filter out messy auto-generated categories and keep only clean ones
          const cleanCategories = data.filter(category => {
            const name = category.name.toLowerCase();
            // Keep only categories with proper English names, exclude auto-generated ones
            return !name.includes('kategori-') && 
                   !name.includes('test') && 
                   !name.includes('api') &&
                   name.length < 20 && // Exclude overly long names
                   !name.match(/\d{8}-\d{6}/); // Exclude date-time patterns
          });
          
          // If we have clean categories, use them, otherwise use fallback
          if (cleanCategories.length > 0) {
            setCategories(cleanCategories);
          } else {
            // Use fallback with known working IDs
            setCategories([
              { id: 25, name: 'Clothes' },
              { id: 26, name: 'Electronics' },
              { id: 27, name: 'Furniture' },
              { id: 28, name: 'Shoes' },
              { id: 29, name: 'Miscellaneous' }
            ]);
          }
        } else {
          console.error('Failed to fetch categories');
          // Fallback to default categories if API fails
          setCategories([
            { id: 25, name: 'Clothes' },
            { id: 26, name: 'Electronics' },
            { id: 27, name: 'Furniture' },
            { id: 28, name: 'Shoes' },
            { id: 29, name: 'Miscellaneous' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories
        setCategories([
          { id: 25, name: 'Clothes' },
          { id: 26, name: 'Electronics' },
          { id: 27, name: 'Furniture' },
          { id: 28, name: 'Shoes' },
          { id: 29, name: 'Miscellaneous' }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user types
    setMessage('');
    setMessageType('');
    
    // Clear field-specific error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle image URL change
  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      images: [e.target.value]
    }));
    
    // Clear messages and errors
    setMessage('');
    setMessageType('');
    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: ""
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const productData = {
        title: formData.title,
        price: parseInt(formData.price),
        description: formData.description,
        categoryId: parseInt(formData.categoryId),
        images: formData.images
      };
      
      console.log('Sending product data:', productData);
      console.log('Selected category:', categories.find(cat => cat.id == formData.categoryId));
      
      const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (response.ok) {
        setMessage(`Product "${responseData.title}" created successfully! Product ID: ${responseData.id}`);
        setMessageType('success');
        
        // Reset form
        setFormData({
          title: '',
          price: '',
          description: '',
          categoryId: '',
          images: ['']
        });
        setErrors({});
      } else {
        setMessage(responseData.message || responseData.error || 'Failed to create product. Please check your input and try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Get category icon based on name
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('clothes')) return '👕';
    if (name.includes('electronics')) return '📱';
    if (name.includes('furniture')) return '🪑';
    if (name.includes('shoes')) return '👟';
    if (name.includes('miscellaneous')) return '📦';
    if (name.includes('grosery') || name.includes('grocery')) return '🛒';
    if (name.includes('computer')) return '💻';
    return '📦';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Product</h1>
          <p className="text-gray-600">Add a new product to your catalog</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Success/Error Message */}
          {message && (
            <div className={`px-6 py-4 border-b ${
              messageType === 'success' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`flex items-center ${
                messageType === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                <div className={`flex-shrink-0 w-5 h-5 mr-3 ${
                  messageType === 'success' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {messageType === 'success' ? (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          )}

          <div className="px-6 py-8">
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                  placeholder="Enter an attractive product title"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    disabled={loadingCategories}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.categoryId ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                    } ${loadingCategories ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="">
                      {loadingCategories ? 'Loading categories...' : 'Select a category'}
                    </option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {getCategoryIcon(category.name)} {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.categoryId}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                  placeholder="Describe your product in detail. What makes it special?"
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.description}
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <p className="text-sm text-gray-500">
                    {formData.description.length}/500
                  </p>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Image URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="images"
                    name="images"
                    value={formData.images[0]}
                    onChange={handleImageChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.images ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                    }`}
                    placeholder="https://example.com/product-image.jpg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                {errors.images && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.images}
                  </p>
                )}
                {formData.images[0] && !errors.images && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img 
                      src={formData.images[0]} 
                      alt="Product preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-sm text-red-600">Failed to load image</div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || loadingCategories}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  loading || loadingCategories
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Product...
                  </span>
                ) : loadingCategories ? (
                  'Loading Categories...'
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create Product
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;