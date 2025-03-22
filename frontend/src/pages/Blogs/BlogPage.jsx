import { useState, useEffect } from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import BlogCard from "../../components/blogs/BlogCard";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>Community Blogs</Typography>
      {loading ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {blogs.map(blog => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogPage;
