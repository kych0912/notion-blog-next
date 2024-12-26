import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const CTASection: React.FC = () => (
  <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}>
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h3" sx={{fontSize:{xs:'2rem', md:'3rem'}}} fontWeight="bold" mb={3}>
        지금 바로 시작하세요
      </Typography>
      <Typography variant="h5" sx={{fontSize:{xs:'1rem', md:'1.2rem'}}} mb={4}>
        복잡한 설정 없이 노션으로 블로그를 시작하세요
      </Typography>
      <a href="https://nextblog.me">
      <Button
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 2,
          bgcolor: 'white',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'grey.100'
          }
        }}
      >
        무료로 시작하기
      </Button>
      </a>
    </Container>
  </Box>
);

export default CTASection;