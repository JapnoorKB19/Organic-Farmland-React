import { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users").then(res => setUsers(res.data)).catch(err => console.error(err));
    axios.get("/api/admin/products").then(res => setProducts(res.data)).catch(err => console.error(err));
  }, []);

  const handleDeleteUser = (id) => {
    axios.delete(`/api/admin/users/${id}`).then(() => setUsers(users.filter(user => user._id !== id)));
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`/api/admin/products/${id}`).then(() => setProducts(products.filter(product => product._id !== id)));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Admin Panel</Typography>

      {/* Users Table */}
      <Typography variant="h6" mt={3}>Manage Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell><Button color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Products Table */}
      <Typography variant="h6" mt={3}>Manage Products</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.farmer.name}</TableCell>
                <TableCell><Button color="error" onClick={() => handleDeleteProduct(product._id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
