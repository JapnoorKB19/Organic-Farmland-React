import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import OrderHistory from "../../components/orders/OrderHistory";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>My Orders</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <OrderHistory orders={orders} onReorder={(order) => console.log("Reorder", order)} />
      )}
    </Container>
  );
};

export default MyOrders;
