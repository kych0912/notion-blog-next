import React, { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';

import { ContainedButton } from '@/app/components/Button/button.styles';
import defaultImage from '@/public/Default_Image.jpeg';

const HeroSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        display: 'flex',
        alignItems: 'center',
      backgroundImage: `url(${defaultImage.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <Container maxWidth="lg"
      ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        component={motion.div}
    >
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontSize: {xs:'2.75rem', md:'4rem'},mb:0 }} component="h3" gutterBottom fontWeight="bold">
          노션 페이지를
        </Typography>
        <Typography variant="h3" sx={{ fontSize: {xs:'2.75rem', md:'4rem'} }} component="h3" gutterBottom fontWeight="bold">
          블로그로 발행하기
        </Typography>
        <Typography variant="h5" sx={{ fontSize: {xs:'1rem', md:'1.5rem'} }} color="text.secondary" mb={4}>
          더 이상 복잡한 설정 필요 없이, 노션에서 바로 블로그를
        </Typography>
        <a href="https://nextblog.me"> 
          <ContainedButton size="large">
            무료로 시작하기
          </ContainedButton>
        </a>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;