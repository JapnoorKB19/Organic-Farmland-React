import axios from 'axios';

// Fetch all products for a specific farmer
export const getFarmerProducts = async (farmerId) => {
  const response = await axios.get(`/api/products`);
  return response.data;
};

// Add a new product for a farmer
export const addFarmerProduct = async (farmerId, productData) => {
  const token = localStorage.getItem("token"); // or from user.token if stored that way

  const response = await axios.post(
    `/api/products`, // ✅ Changed this line
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // required for file upload
      }
    }
  );

  return response.data;
};

// Update an existing product by product ID
export const updateFarmerProduct = async (productId, updatedData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `/api/products/${productId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // only if updating with image
      }
    }
  );

  return response.data;
};

// Delete a product by product ID
export const deleteFarmerProduct = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `/api/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// ✅ NEW: Fetch all products from all farmers (for Browse Products page)
export const getAllProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};