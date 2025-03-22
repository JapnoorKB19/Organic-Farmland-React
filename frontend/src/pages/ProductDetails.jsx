import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, TextField, Button, List, ListItem, CircularProgress } from "@mui/material";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setReviews(res.data.reviews);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddReview = () => {
    if (!review.trim()) return;
    axios.post(`/api/products/${id}/reviews`, { text: review })
      .then(res => setReviews([...reviews, res.data]))
      .catch(err => console.error(err));
    setReview("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? <CircularProgress /> : (
        <Card>
          <CardContent>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6">₹{product.price}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="caption">Seller: {product.farmer.name} | {product.farmer.city}</Typography>

            <Typography variant="h6" mt={3}>Reviews</Typography>
            <List>
              {reviews.map((r, index) => (
                <ListItem key={index}>{r.text}</ListItem>
              ))}
            </List>

            <TextField
              label="Add a review"
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddReview}>Submit</Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetail;
