import { Card, CardContent, Typography, Button } from "@mui/material";

const OrderSummary = ({ order, onEdit, onConfirm }) => {
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Order Summary</Typography>
        <Typography>Product: {order.productName}</Typography>
        <Typography>Quantity: {order.quantity}</Typography>
        <Typography>Total Price: ₹{order.totalAmount}</Typography>
        <Typography>Delivery Address: {order.deliveryAddress}</Typography>

        <Button onClick={onEdit} sx={{ mt: 2, mr: 1 }} variant="outlined">Edit</Button>
        <Button onClick={onConfirm} sx={{ mt: 2 }} variant="contained" color="primary">
          Confirm Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
