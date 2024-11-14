'use client'
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorProps {
  message: string;
  duration?: number;
  type?: "snackbar" | "alert";
  resetError: () => void;
}

const ErrorSnackbar: React.FC<ErrorProps> = ({ message, duration = 3000, resetError}) => {
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
    resetError();
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

export default function ErrorHandler({ 
  message, 
  duration = 3000, 
  type,
  resetError
 }:ErrorProps){
  if(type === "snackbar") return <ErrorSnackbar message={message} duration={duration} resetError={resetError}/>;
  if(type === "alert") return <></>;  
}
