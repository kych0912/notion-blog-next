'use client'

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2)
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const NameCheckBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'flex-start'
}));

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isNameAvailable, setIsNameAvailable] = useState(false);

  // 이름 중복 체크
  const checkNameAvailability = async () => {
    
  };

  // 사용자 등록
  const handleSubmit = async () => {
    
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          새로운 사용자 등록
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormBox>
            <NameCheckBox>
              <TextField
                fullWidth
                label="이름"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsNameAvailable(false);
                  setError('');
                  setSuccess('');
                }}
                error={!!error}
                helperText={error}
                disabled={loading}
              />
              <Button
                variant="contained"
                onClick={checkNameAvailability}
                disabled={loading || !name.trim()}
                sx={{ minWidth: '100px', height: '56px' }}
              >
                {loading ? <CircularProgress size={24} /> : '중복확인'}
              </Button>
            </NameCheckBox>

            {isNameAvailable && !error && (
              <Alert severity="success">
                사용 가능한 이름입니다
              </Alert>
            )}

            {success && (
              <Alert severity="success">
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || !isNameAvailable || !name.trim()}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : '등록하기'}
            </Button>
          </FormBox>
        </form>
      </CardContent>
    </StyledCard>
  );
};

export default UserRegistration;