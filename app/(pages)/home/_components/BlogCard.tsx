import React, { useRef } from 'react';
import { Grid, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import BlogImage from './BlogImage';
import CircularScore from './CircleScore';

interface Blog {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: string;
}

interface BlogCardProps {
  blog: Blog;
  index: number;
  component?: React.ReactNode;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index, component }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={0} alignItems="center" sx={{ py: 15,display:'flex' }} key={index}>
      {index % 2 === 0 ? (
        <>
          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            ref={ref2}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            sx={{order:{xs:2, md:0}}}
          >
            <BlogImage src={blog.image} alt={blog.title} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              order:{xs:1, md:0},
              mb:{xs:5, md:0}
            }}
            component={motion.div}
            ref={ref1}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: 'inline-block',
                borderRadius: '24px',
                bgcolor: 'primary.light',
                mb: 2
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: '400', px: 2, py: 1 }} textAlign="center">
                {blog.category}
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontSize: {xs:'1.75rem', md:'2.5rem'}, fontWeight: 'bold', mb: 2 }} textAlign="center">
              {blog.title}
            </Typography>

            <Typography variant="h5" sx={{ fontSize: {xs:'1rem', md:'1.2rem'}, fontWeight: '400', color: 'text.secondary' }} textAlign="center">
              {blog.summary.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              order:{xs:1, md:0},
              mb:{xs:5, md:0}
            }}
            component={motion.div}
            ref={ref1}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: 'inline-block',
                borderRadius: '24px',
                bgcolor: 'primary.light',
                mb: 2
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: '400', px: 2, py: 1 }} textAlign="center">
                {blog.category}
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontSize: {xs:'1.75rem', md:'2.5rem'}, fontWeight: 'bold', mb: 2 }} textAlign="center">
              {blog.title}
            </Typography>

            <Typography variant="h5" sx={{ fontSize: {xs:'1rem', md:'1.2rem'}, fontWeight: '400', color: 'text.secondary' }} textAlign="center">
              {blog.summary.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            ref={ref2}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            sx={{order:1, display:'flex', justifyContent:'center', alignItems:'center'}}
          >
            {isInView2 && <CircularScore score={100} duration={3}/>}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default BlogCard;