import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField,
  Paper,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@mui/icons-material';

const NotionPublishInterface = () => {
  const [url, setUrl] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loadButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
  const fullUrl = 'https://befitting-jodhpur-407.notion.site/Term-Project-Propos';
  
  // Typing animation
  useEffect(() => {
    if (!isAnimating) return;
  
    const animationSequence = async () => {
      // URL 입력 애니메이션
      for (let i = 0; i <= fullUrl.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setUrl(fullUrl.slice(0, i));
      }
  
      // 로드 버튼 클릭 애니메이션
      await new Promise(resolve => setTimeout(resolve, 500));
      if (loadButtonRef.current) {
        loadButtonRef.current.style.transform = 'scale(0.95)';
        await new Promise(resolve => setTimeout(resolve, 200));
        loadButtonRef.current.style.transform = 'scale(1)';
      }
  
      // 로딩 상태
      setIsPublishing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPublishing(false);
  
      // 제출 버튼 클릭 애니메이션
      await new Promise(resolve => setTimeout(resolve, 500));
      if (submitButtonRef.current) {
        submitButtonRef.current.style.transform = 'scale(0.95)';
        await new Promise(resolve => setTimeout(resolve, 200));
        submitButtonRef.current.style.transform = 'scale(1)';
      }
  
      // 애니메이션 종료
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAnimating(false);
  
      // 3초 후 애니메이션 리셋 및 재시작
      setTimeout(() => {
        handleResetAnimation();
        setIsAnimating(true); // 직접적으로 다시 시작
      }, 3000);
    };
  
    animationSequence();
  }, [isAnimating]);
  // Reset animation
  const handleResetAnimation = () => {
    setUrl('');
    setIsPublishing(false);
    setIsAnimating(true);
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '600px', 
        mx: 'auto', 
        mt: 4,
        px: 2,
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold'
          }}
        >
          Notion 페이지 주소를 입력해주세요.
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="https://your-notion-page-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: { 
                fontSize: '0.9rem',
                '& input': { 
                  p: 0.5 
                }
              }
            }}
          />
          <Button
            ref={buttonRef}
            variant="contained"
            size="small"
            disabled={!url || isPublishing}
            sx={{
              ml: 1,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              minWidth: '80px',
              transition: 'transform 0.2s ease',
            }}
          >
            {isPublishing ? '변환중...' : '불러오기'}
          </Button>
        </Paper>

      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button
          startIcon={<KeyboardArrowLeftIcon />}
          sx={{ color: 'text.secondary' }}
        >
          뒤로가기
        </Button>
        <Button
            ref={submitButtonRef}
          variant="contained"
          disabled={!url || isPublishing}
          sx={{
            minWidth: '80px',
            color:"white"
          }}
        >
          작성
        </Button>
      </Box>
    </Box>
  );
};

export default NotionPublishInterface;