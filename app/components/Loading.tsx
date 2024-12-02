'use client'
import { Box, CircularProgress } from '@mui/material';

export const Loading = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }}
  >
    <CircularProgress 
      sx={{
        color: 'primary.main',
        // 선택적: 크기 조절
        '& .MuiCircularProgress-svg': {
          width: 40,
          height: 40
        }
      }}
    />
  </Box>
);