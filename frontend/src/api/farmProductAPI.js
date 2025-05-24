import axios from 'axios'

// Fetch all products for a farmer
export const getFarmerProducts = async (farmerId) => {
  const response = await axios.get(`/api/farmers/${farmerId}/products`)
  return response.data
}

// Add a new product for a farmer
export const addFarmerProduct = async (farmerId, productData) => {
  const response = await axios.post(`/api/farmers/${farmerId}/products`, productData)
  return response.data
}

// Update an existing product by product ID
export const updateFarmerProduct = async (productId, updatedData) => {
  const response = await axios.put(`/api/products/${productId}`, updatedData)
  return response.data
}

// Delete a product by product ID
export const deleteFarmerProduct = async (productId) => {
  const response = await axios.delete(`/api/products/${productId}`)
  return response.data
}
