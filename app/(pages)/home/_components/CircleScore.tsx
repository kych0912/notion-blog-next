import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface CircularScoreProps {
  score: number;
  duration: number;
}

const CircularScore: React.FC<CircularScoreProps> = ({ score, duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= score ? score : prevProgress + (score / (duration * 10))));
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [score, duration]);

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: '300px', height: '300px'}}>
      <CircularProgress variant="determinate" value={progress} size="100%" sx={{color:'success.main'}} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{fontSize:'3rem', fontWeight:'bold'}} component="div" color="textSecondary">
          {`${Math.round(progress)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularScore;