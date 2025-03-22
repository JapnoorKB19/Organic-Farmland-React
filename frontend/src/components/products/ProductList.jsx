import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = ({ products, onDelete }) => {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product._id} secondaryAction={
          <IconButton edge="end" onClick={() => onDelete(product._id)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={product.name} secondary={`₹${product.price}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
