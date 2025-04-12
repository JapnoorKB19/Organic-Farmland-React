// src/components/common/Footer.jsx
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#E8F5E9",
        py: 6,
        mt: "auto",
        borderTop: "4px solid #2E7D32",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Farm Connect Description */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" fontWeight="bold" color="#2E7D32" gutterBottom>
              Farm Connect 🌿
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting local organic farmers with consumers for a sustainable future.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                <IconButton
                  key={index}
                  aria-label="social-icon"
                  sx={{
                    color: "#2E7D32",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    mx: 0.5,
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#2E7D32", color: "white" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" color="#2E7D32" gutterBottom>
              Quick Links
            </Typography>
            {[
              { text: "Home", href: "/" },
              { text: "Search Farmers", href: "/search" },
              { text: "Blog", href: "/blog" },
              { text: "Login / Register", href: "/login" },
            ].map((link, index) => (
              <Typography key={index} variant="body2" display="block" sx={{ mb: 1 }}>
                <Link href={link.href} sx={{ textDecoration: "none", color: "#1B5E20", fontWeight: "bold" }}>
                  {link.text}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" color="#2E7D32" gutterBottom>
              Contact Us 📩
            </Typography>
            <Typography variant="body2" color="text.secondary">📧 info@farmconnect.com</Typography>
            <Typography variant="body2" color="text.secondary">📞 +1 (555) 123-4567</Typography>
            <Typography variant="body2" color="text.secondary">📍 123 Organic Way, Farm City, FC 12345</Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary">
            {`© ${new Date().getFullYear()} Farm Connect. All rights reserved.`}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
