import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
    message: string;
    duration?: number;
    resetError?: () => void;
  }
  
export default function ErrorSnackbar({ message, duration = 3000, resetError}:ErrorSnackbarProps) {
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      if (message) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, [message]);
  
    const handleClose = () => {
      setOpen(false);
      resetError?.();
    };
  
    return (
      <Snackbar 
        open={open} 
        autoHideDuration={duration} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose}
          severity="error" 
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };