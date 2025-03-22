import { Grid } from "@mui/material";
import FarmerCard from "./FarmerCard";

const FarmerList = ({ farmers }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {farmers.map((farmer) => (
        <Grid item key={farmer._id}>
          <FarmerCard farmer={farmer} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FarmerList;
