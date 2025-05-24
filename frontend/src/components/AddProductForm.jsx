import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material'
import axios from 'axios'

const AddProductForm = ({ open, onClose, onAdd, farmerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await axios.post(
        `/api/farmers/${farmerId}/products`,
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }
      )
      onAdd(res.data)           // notify parent of new product
      setSuccessOpen(true)
      setFormData({ name: '', description: '', price: '', quantity: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price (₹)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success">
          Product added!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddProductForm
