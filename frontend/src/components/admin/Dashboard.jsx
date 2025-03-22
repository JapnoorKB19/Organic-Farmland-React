import { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import AdminCard from "../../components/admin/AdminCard";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Admin Dashboard</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <AdminCard title="Users" count={stats.users} />
          <AdminCard title="Farmers" count={stats.farmers} />
          <AdminCard title="Products" count={stats.products} />
          <AdminCard title="Orders" count={stats.orders} />
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
