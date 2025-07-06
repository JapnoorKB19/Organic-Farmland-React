import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Snackbar, Alert, CircularProgress, Grid,
  Card, CardContent, CardActions, TextField, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MenuItem } from '@mui/material';
import ChatWithConsumers from "../ChatWithConsumers";

import {
  getFarmerProducts,
  addFarmerProduct,
  updateFarmerProduct,
  deleteFarmerProduct
} from '../../api/farmProductAPI';

import { getConversations } from '../../api/chatAPI'; // make sure this path is correct

const FarmerDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || 'Farmer';

  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', quantity: '', image: null, category:'Vegetable'
  });
  const [addLoading, setAddLoading] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  // New states for chat
  const [chatOpen, setChatOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConvoId, setCurrentConvoId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpenSnackbar(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [user._id]);

  // Fetch farmer conversations when chat drawer opens
  useEffect(() => {
    if (!chatOpen) return;

    const fetchConversations = async () => {
      try {
        const res = await getConversations(user._id);
        setConversations(res.data);

        if (res.data.length > 0 && !currentConvoId) {
          setCurrentConvoId(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };

    fetchConversations();
  }, [chatOpen, user._id, currentConvoId]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFarmerProducts(user._id);
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, val]) => {
        if (val !== null) formData.append(key, val);
      });

      await addFarmerProduct(formData);
      setNewProduct({ name: '', description: '', price: '', quantity: '', image: null, category:'Vegetable'});
      fetchProducts();
    } catch (err) {
      alert('Failed to add product.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteFarmerProduct(user._id, productId);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  const handleEditOpen = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(editingProduct).forEach(([key, val]) => {
        if (val !== null) formData.append(key, val);
      });

      await updateFarmerProduct(user._id, editingProduct._id, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to update product.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to get consumer's name from conversation participants
  const getConsumerName = (participants) => {
    const consumer = participants.find(p => p._id !== user._id);
    return consumer?.name || "User";
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', backgroundColor: '#f3fff4', minHeight: '100vh' }}>
      <Snackbar open={openSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
          Hi {userName}, your organic fields are calling! 🌾🐝
        </Alert>
      </Snackbar>

      <Box sx={{ backgroundColor: '#a5d6a7', p: 4, borderRadius: 4, mb: 4 }}>
        <Typography variant="h3" textAlign="center" color="white">
          Welcome back, {userName}! 🌿
        </Typography>
        <Typography textAlign="center" color="white" mt={1}>
          Ready to share your freshest harvest with the community?
        </Typography>
      </Box>

      {/* Chat Consumer Selection */}
      <Box textAlign="right" mb={2}>
        <Button
          variant="contained"
          onClick={() => setChatOpen(true)}
          sx={{ borderRadius: 3 }}
        >
          Open Chat
        </Button>
      </Box>

      {chatOpen && (
        <Box mb={2}>
          <Typography variant="subtitle1" mb={1}>Select Consumer to Chat</Typography>
          {conversations.length === 0 && <Typography>No conversations found.</Typography>}
          {conversations.map((convo) => {
            const consumerName = getConsumerName(convo.participants);
            return (
              <Button
                key={convo._id}
                variant={currentConvoId === convo._id ? "contained" : "outlined"}
                sx={{ m: 0.5 }}
                onClick={() => setCurrentConvoId(convo._id)}
              >
                {consumerName}
              </Button>
            );
          })}
        </Box>
      )}

      {/* Add Product Form */}
      <Box
        component="form"
        onSubmit={handleAddProduct}
        sx={{
          mb: 6,
          p: 3,
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom color="primary">Add New Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Name" name="name" value={newProduct.name} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Description" name="description" value={newProduct.description} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField fullWidth label="Price (₹)" name="price" type="number" value={newProduct.price} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField fullWidth label="Quantity" name="quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button fullWidth variant="outlined" component="label">
              Upload Image
              <input hidden accept="image/*" type="file" name="image" onChange={handleInputChange} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={addLoading}
            >
              {addLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Product Type"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              {['Vegetable', 'Fruit', 'Honey', 'Dairy'].map((option)=>(
                <MenuItem key={option} value={option}> {option}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {!loading && products.length === 0 && (
          <Typography>No products found. Add some!</Typography>
        )}
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {product.images?.[0] && (
                <Box
                  component="img"
                  src={`http://localhost:5000/${product.images[0]}`}
                  alt={product.name}
                  sx={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary" variant="body2" gutterBottom>{product.description}</Typography>
                <Typography variant="body1">Price: ₹{product.price}</Typography>
                <Typography variant="body2">Quantity: {product.quantity}</Typography>
              </CardContent>
              <CardActions>
                <IconButton color="primary" onClick={() => handleEditOpen(product)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(product._id)}><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingProduct)} onClose={() => setEditingProduct(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={editingProduct?.name || ''} onChange={handleEditChange} fullWidth />
            <TextField label="Description" name="description" value={editingProduct?.description || ''} onChange={handleEditChange} fullWidth />
            <TextField label="Price" name="price" type="number" value={editingProduct?.price || ''} onChange={handleEditChange} fullWidth />
            <TextField label="Quantity" name="quantity" type="number" value={editingProduct?.quantity || ''} onChange={handleEditChange} fullWidth />
            <Button variant="outlined" component="label">
              Upload New Image
              <input hidden accept="image/*" type="file" name="image" onChange={handleEditChange} />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Logout */}
      <Box mt={6} textAlign="center">
        <Button variant="contained" color="error" onClick={handleLogout} sx={{ borderRadius: 3, px: 4 }}>
          Logout
        </Button>
      </Box>

      {/* Chat Drawer */}
      {chatOpen && (
        <ChatWithConsumers
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          initialConvoId={currentConvoId}
        />
      )}
    </Box>
  );
};

export default FarmerDashboard;
