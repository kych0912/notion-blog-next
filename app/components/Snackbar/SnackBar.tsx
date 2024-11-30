import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ISnackbarProps {
    message: string;
    type: 'error' | 'success' | 'info' | 'warning';
    duration?: number;
    resetError?: () => void;
  }
  
export function SnackBar({ message, type, duration = 3000, resetError}:ISnackbarProps) {
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
        sx={{
          bottom:50
        }}
      >
        <Alert 
          onClose={handleClose}
          severity={type} 
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };