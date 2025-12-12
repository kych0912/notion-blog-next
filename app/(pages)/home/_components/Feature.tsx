import { Box, styled, Typography } from "@mui/material";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

import BlogImage from "./BlogImage";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  demo?: React.ReactNode;
}


export default function Feature({ title, description, image, demo }: FeatureProps) {
  const controls = useAnimation();
  
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-100px 0px' });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        transition={{ duration: 0.5 }}
      >
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
          <Box sx={{pl:1}}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            {title}
          </Typography>
          <Typography 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>
        </Box>
        {demo && demo}
      </Box>
    </motion.div>
  );
}

