// src/components/common/Footer.jsx
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Farm Connect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting local organic farmers with consumers for a sustainable future.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" color="text.secondary" display="block" component={Link} href="/" sx={{ mb: 1, textDecoration: 'none' }}>
              Home
            </Typography>
            <Typography variant="body2" color="text.secondary" display="block" component={Link} href="/search" sx={{ mb: 1, textDecoration: 'none' }}>
              Search Farmers
            </Typography>
            <Typography variant="body2" color="text.secondary" display="block" component={Link} href="/blog" sx={{ mb: 1, textDecoration: 'none' }}>
              Blog
            </Typography>
            <Typography variant="body2" color="text.secondary" display="block" component={Link} href="/login" sx={{ mb: 1, textDecoration: 'none' }}>
              Login / Register
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: info@farmconnect.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Address: 123 Organic Way, Farm City, FC 12345
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Farm Connect. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer