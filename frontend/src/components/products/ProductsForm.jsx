import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <TextField label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      <TextField label="Category" name="category" value={formData.category} onChange={handleChange} required />
      <Button type="submit" variant="contained" color="primary">Add Product</Button>
    </Box>
  );
};

export default ProductForm;
