import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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
  IconButton
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


const Login = () => {
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])
  
  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState('')
  
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
  
  const validateForm = () => {
    const errors = {}
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous login error
    setLoginError('')
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    try {
      const user = await login(formData.email, formData.password)

      // 👇 Role-based redirection
      switch (user.role) {
        case 'farmer':
          navigate('/dashboard/farmer', { replace: true })
          break
        case 'consumer':
          navigate('/dashboard/consumer', { replace: true })
          break
        case 'admin':
          navigate('/dashboard/admin', { replace: true })
          break
        default:
          navigate('/', { replace: true }) // fallback
      }
    } catch (err) {
      setLoginError(
        err.response?.data?.message ||
        error ||
        'Failed to login. Please check your credentials.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
        <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
        {loginError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {loginError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            sx={{
              '& label.Mui-focused': { color: 'success.main' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'success.light' },
                '&:hover fieldset': { borderColor: 'success.main' },
                '&.Mui-focused fieldset': { borderColor: 'success.main' },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
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
            sx={{
              '& label.Mui-focused': { color: 'success.main' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'success.light' },
                '&:hover fieldset': { borderColor: 'success.main' },
                '&.Mui-focused fieldset': { borderColor: 'success.main' },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark'}}}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="success">
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="success">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
