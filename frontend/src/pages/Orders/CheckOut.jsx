import { useState } from "react";
import { Container, Typography } from "@mui/material";
import OrderForm from "../../components/orders/OrderForm";
import OrderSummary from "../../components/orders/OrderSummary";
import axios from "axios";

const Checkout = () => {
  const [order, setOrder] = useState(null);

  const handleOrderSubmit = (formData) => {
    // Mock product data for now
    const productDetails = { name: "Organic Rice", price: 100, unit: "kg" };
    const totalAmount = formData.quantity * productDetails.price;

    setOrder({
      ...formData,
      productName: productDetails.name,
      totalAmount,
    });
  };

  const handleConfirmOrder = () => {
    axios.post("/api/orders", order)
      .then(() => alert("Order placed successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Checkout</Typography>
      {!order ? (
        <OrderForm onSubmit={handleOrderSubmit} products={[{ _id: "1", name: "Organic Rice", price: 100, unit: "kg" }]} />
      ) : (
        <OrderSummary order={order} onEdit={() => setOrder(null)} onConfirm={handleConfirmOrder} />
      )}
    </Container>
  );
};

export default Checkout;
