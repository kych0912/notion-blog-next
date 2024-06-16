'use client'
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
  message: string;
  duration?: number;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ message, duration = 3000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;