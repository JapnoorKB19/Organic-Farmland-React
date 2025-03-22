import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const OrderHistory = ({ orders, onReorder }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {orders.length > 0 ? (
        orders.map((order) => (
          <Grid item key={order._id}>
            <Card sx={{ minWidth: 300 }}>
              <CardContent>
                <Typography variant="h6">Order #{order.orderNumber}</Typography>
                <Typography>Product: {order.productName}</Typography>
                <Typography>Quantity: {order.quantity}</Typography>
                <Typography>Total: ₹{order.totalAmount}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Button onClick={() => onReorder(order)} variant="outlined" sx={{ mt: 2 }}>
                  Reorder
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" textAlign="center">No Orders Found</Typography>
      )}
    </Grid>
  );
};

export default OrderHistory;
