import React from "react";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

const FarmerCard = ({ farmer }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={farmer.image || "https://source.unsplash.com/300x200/?farmer,organic"}
        alt={farmer.name}
      />
      <CardContent>
        <Typography variant="h6">{farmer.name}</Typography>
        <Typography variant="body2" color="text.secondary">{farmer.city}, {farmer.state}</Typography>
        <Button size="small" component={Link} to={`/farmer/${farmer.id}`} sx={{ mt: 1 }}>
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default FarmerCard;
