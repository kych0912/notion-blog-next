import React from 'react';
import {CircularProgress,Box} from '@mui/material';

const LoadingPage: React.FC = () => {
    return (
        <Box sx={{
            height:"100%",
            width:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }}>
            <CircularProgress />
        </Box>
    );
};

export default LoadingPage;