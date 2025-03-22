import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import ProductList from "../../components/products/ProductList";
import ProductForm from "../../components/products/ProductForm";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get("/api/admin/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddProduct = (newProduct) => {
    axios.post("/api/admin/products", newProduct)
      .then(res => setProducts([...products, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Product Management</Typography>
      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Product"}
      </Button>
      {showForm && <ProductForm onSubmit={handleAddProduct} />}
      {loading ? <CircularProgress /> : <ProductList products={products} />}
    </Container>
  );
};

export default ProductManagement;
