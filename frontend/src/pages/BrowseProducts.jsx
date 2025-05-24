// src/pages/BrowseProducts.jsx
import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material'

const BrowseProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [categories, setCategories] = useState(['All', 'Vegetables', 'Fruits', 'Grains'])

  useEffect(() => {
    // Replace with real API call
    const fetchProducts = async () => {
      try {
        const dummyData = [
          {
            id: 1,
            name: 'Organic Tomatoes',
            category: 'Vegetables',
            price: 30,
            image: 'https://via.placeholder.com/300x200',
            farmer: 'Rajiv Sharma',
          },
          {
            id: 2,
            name: 'Fresh Apples',
            category: 'Fruits',
            price: 50,
            image: 'https://via.placeholder.com/300x200',
            farmer: 'Aarti Singh',
          },
        ]
        setProducts(dummyData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = filter === 'All'
    ? products
    : products.filter((p) => p.category === filter)

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Browse Products
      </Typography>

      <FormControl sx={{ mb: 4, minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Category">
          {categories.map((cat) => (
            <MenuItem value={cat} key={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="textSecondary">
                    By {product.farmer}
                  </Typography>
                  <Typography>₹{product.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default BrowseProducts
