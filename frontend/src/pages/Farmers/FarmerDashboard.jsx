import { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import ProductCard from "../../components/products/ProductCard";

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/farmer/dashboard")
      .then(res => setFarmer(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? <CircularProgress /> : (
        <>
          <Typography variant="h4">{farmer.name}'s Dashboard</Typography>
          <Typography variant="body1">📍 {farmer.city}</Typography>

          <Button variant="contained" sx={{ mt: 2 }}>Add Product</Button>

          <Typography variant="h5" mt={3}>Your Products</Typography>
          <Grid container spacing={3} mt={1}>
            {farmer.products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default FarmerDashboard;
