// src/pages/MyReviews.jsx
import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Rating,
  Stack,
  Divider,
  CircularProgress,
} from '@mui/material'

const MyReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with real API call to fetch user reviews
    const fetchReviews = async () => {
      try {
        const dummyReviews = [
          {
            farmerName: 'Rajiv Kumar',
            rating: 4.5,
            comment: 'Great quality organic vegetables!',
            date: '2025-05-10',
          },
          {
            farmerName: 'Meena Devi',
            rating: 5,
            comment: 'The fruits were fresh and well-packed.',
            date: '2025-04-28',
          },
        ]
        setReviews(dummyReviews)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Reviews
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={3}>
          {reviews.map((review, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                {review.farmerName}
              </Typography>
              <Rating value={review.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" mt={1}>
                {review.comment}
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <Typography variant="caption" color="text.disabled">
                {review.date}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default MyReviews
