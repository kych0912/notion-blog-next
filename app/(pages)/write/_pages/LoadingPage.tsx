import React from 'react';
import {CircularProgress,Box} from '@mui/material';

const LoadingPage: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height:"calc(100vh - 58px)",
        }}>
            <CircularProgress />
        </Box>
    );
};

export default LoadingPage;