// src/pages/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Register = () => {
  const { register, error: authError } = useAuth()
  const navigate = useNavigate()
  
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Account Type', 'Personal Information', 'Credentials']
  
  const [formData, setFormData] = useState({
    role: 'consumer',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    country: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      })
    }
  }
  
  const validateStep = (step) => {
    const errors = {}
    
    switch (step) {
      case 0:
        // Account type validation (always valid since there's a default)
        break
      case 1:
        // Personal information validation
        if (!formData.name.trim()) {
          errors.name = 'Name is required'
        }
        
        if (!formData.city.trim()) {
          errors.city = 'City is required'
        }
        
        if (!formData.state.trim()) {
          errors.state = 'State is required'
        }
        
        if (!formData.country.trim()) {
          errors.country = 'Country is required'
        }
        break
      case 2:
        // Credentials validation
        if (!formData.email.trim()) {
          errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Email is invalid'
        }
        
        if (!formData.password) {
          errors.password = 'Password is required'
        } else if (formData.password.length < 8) {
          errors.password = 'Password must be at least 8 characters'
        }
        
        if (!formData.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match'
        }
        break
      default:
        break
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate the current step
    if (!validateStep(activeStep)) {
      return
    }
    
    // If we're not on the last step, move to the next step
    if (activeStep < steps.length - 1) {
      handleNext()
      return
    }
    
    // Clear previous registration error
    setRegisterError('')
    
    setIsSubmitting(true)
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData
      
      await register(registerData)
      
      // If user is a farmer, navigate to farm profile setup
      if (formData.role === 'farmer') {
        navigate('/farm-setup')
      } else {
        navigate('/')
      }
    } catch (err) {
      // Improved error handling to handle different error structures
      let errorMessage = 'Registration failed. Please try again.';
      
      // If err is an error object with a message property
      if (err?.message) {
        errorMessage = err.message;
      }
      // If err has a response object (like from axios)
      else if (err?.response?.data) {
        errorMessage = err.response.data.message || 
                      (typeof err.response.data === 'string' ? err.response.data : errorMessage);
      }
      // Use the context error if available
      else if (authError) {
        errorMessage = authError;
      }
      
      setRegisterError(errorMessage);
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Render step content based on active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Select Account Type
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">I am a:</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <FormControlLabel 
                  value="consumer" 
                  control={<Radio />} 
                  label="Consumer - I want to buy fresh produce" 
                />
                <FormControlLabel 
                  value="farmer" 
                  control={<Radio />} 
                  label="Farmer - I want to sell my produce" 
                />
              </RadioGroup>
            </FormControl>
          </>
        )
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleChange}
              error={Boolean(formErrors.city)}
              helperText={formErrors.city}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="state"
              label="State/Province"
              name="state"
              autoComplete="address-level1"
              value={formData.state}
              onChange={handleChange}
              error={Boolean(formErrors.state)}
              helperText={formErrors.state}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              value={formData.country}
              onChange={handleChange}
              error={Boolean(formErrors.country)}
              helperText={formErrors.country}
            />
          </>
        )
      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Account Credentials
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(formErrors.confirmPassword)}
              helperText={formErrors.confirmPassword}
            />
          </>
        )
      default:
        return 'Unknown step'
    }
  }
  
  return (
    <Container component="main" maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an Account
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ width: '100%', my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {registerError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {registerError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {activeStep === steps.length - 1 
                ? (isSubmitting ? 'Creating Account...' : 'Create Account') 
                : 'Next'}
            </Button>
          </Box>
        </Box>
        
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Register