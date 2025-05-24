import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material'

const ExploreFarmers = () => {
  const [search, setSearch] = useState('')
  const [allFarmers, setAllFarmers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all farmers from backend on initial render
  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/farmers`)
        if (!response.ok) throw new Error('Failed to fetch farmers')

        const data = await response.json()
        setAllFarmers(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchFarmers()
  }, [])

  // Filter farmers client-side based on search input
 const filteredFarmers = allFarmers.filter((farmer) => {
  const query = search.toLowerCase()
  return (
    (farmer?.name?.toLowerCase() || '').includes(query) ||
    (farmer?.city?.toLowerCase() || '').includes(query)
  )
})

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom color="success">
        Explore Farmers
      </Typography>

      <TextField
        fullWidth
        label="Search by name or city"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredFarmers.length === 0 ? (
            <Typography>No farmers found.</Typography>
          ) : (
            filteredFarmers.map((farmer) => (
              <Grid item xs={12} sm={6} md={4} key={farmer._id || farmer.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{farmer.name}</Typography>
                    <Typography color="textSecondary">{farmer.city}</Typography>
                    <Typography>⭐ {farmer.rating || 'N/A'}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      href={`/farmers/${farmer._id || farmer.id}`}
                    >
                      View Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  )
}

export default ExploreFarmers
