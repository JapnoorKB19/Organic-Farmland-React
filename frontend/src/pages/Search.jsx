import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import SearchBar from "../components/common/SearchBar";
import FarmerList from "../components/farmer/FarmerList";
import axios from "axios";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") return;
    setLoading(true);

    axios.get(`/api/farmers?search=${searchQuery}`)
      .then((res) => setFarmers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <Container sx={{ mt: 4 }}>
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : farmers.length > 0 ? (
        <FarmerList farmers={farmers} />
      ) : (
        <Typography variant="h6" textAlign="center" mt={4}>
          No Farmers Found
        </Typography>
      )}
    </Container>
  );
};

export default Search;
