import { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography, Box } from "@mui/material";

const OrderForm = ({ onSubmit, products }) => {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    deliveryAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>Place an Order</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          select
          label="Select Product"
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          required
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>
              {product.name} - ₹{product.price}/{product.unit}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          inputProps={{ min: 1 }}
        />

        <TextField
          label="Delivery Address"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          multiline
          rows={2}
        />

        <Button type="submit" variant="contained" color="primary">Submit Order</Button>
      </Box>
    </Container>
  );
};

export default OrderForm;
