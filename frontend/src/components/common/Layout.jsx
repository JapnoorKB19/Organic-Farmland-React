import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import AgricultureIcon from '@mui/icons-material/Agriculture'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Footer from './Footer'

const Layout = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const getPages = () => {
    const commonPages = [
      { title: 'Home', path: '/' },
      { title: 'Search Farmers', path: '/search' },
      { title: 'Blog', path: '/blog' }
    ]
    if (!isAuthenticated) return commonPages
    if (user?.role === 'admin') return [...commonPages, { title: 'Admin Dashboard', path: '/admin' }]
    if (user?.role === 'farmer') return [...commonPages, { title: 'My Farm', path: `/farmers/${user._id}` }, { title: 'Orders', path: '/my-orders' }]
    if (user?.role === 'consumer') return [...commonPages, { title: 'My Orders', path: '/my-orders' }]
    return commonPages
  }

  const pages = getPages()
  const settings = isAuthenticated ? ['Profile', 'My Orders', 'Logout'] : ['Login', 'Register']

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const handleSettingClick = (setting) => {
    setAnchorElUser(null)
    if (setting === 'Logout') return logout(), navigate('/')
    navigate(`/${setting.toLowerCase().replace(' ', '-')}`)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AgricultureIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FARM CONNECT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={(e) => setAnchorElNav(e.currentTarget)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={() => setAnchorElNav(null)}>
                {pages.map(({ title, path }) => (
                  <MenuItem key={title} component={Link} to={path} onClick={() => setAnchorElNav(null)}>
                    {title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(({ title, path }) => (
                <Button key={title} component={Link} to={path} sx={{ my: 2, color: 'white' }}>
                  {title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <form onSubmit={handleSearch}>
                <TextField
                  size="small"
                  placeholder="Search city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    mr: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'transparent' },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" sx={{ color: 'white' }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                  <Avatar src={user?.avatar} sx={{ bgcolor: user ? '#f57c00' : '#9e9e9e' }}>
                    {user?.name?.[0]?.toUpperCase() || 'G'}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, py: 3, width: '100vw' }}>
          <Outlet />
      </Box>

      <Footer />
    </Box>
  )
}

export default Layout
