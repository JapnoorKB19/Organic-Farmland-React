import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`/api/admin/users/${userId}`)
      .then(() => setUsers(users.filter(user => user._id !== userId)))
      .catch(err => console.error(err));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>User Management</Typography>
      {loading ? <CircularProgress /> : (
        <List>
          {users.map(user => (
            <ListItem key={user._id} secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(user._id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserManagement;
