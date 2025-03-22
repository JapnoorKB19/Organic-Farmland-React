import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? <CircularProgress /> : (
        <>
          <Typography variant="h4">{blog.title}</Typography>
          <Typography variant="body1" mt={2}>{blog.content}</Typography>
        </>
      )}
    </Container>
  );
};

export default BlogDetail;
