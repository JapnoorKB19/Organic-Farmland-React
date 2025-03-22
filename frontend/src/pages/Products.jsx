import { useState, useEffect } from "react";
import { Container, Typography, Grid, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product =>
    product.farmer.city.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Explore Products</Typography>

      <TextField
        label="Search by city"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductsPage;
