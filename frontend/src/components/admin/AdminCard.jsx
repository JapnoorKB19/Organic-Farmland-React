import { Card, CardContent, Typography } from "@mui/material";

const AdminCard = ({ title, count }) => {
  return (
    <Card sx={{ minWidth: 200, p: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
