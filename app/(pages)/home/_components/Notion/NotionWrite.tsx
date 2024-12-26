import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotionWritingDemo = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `# React-Query 캐싱 활용하기
## 주요 기능
- SSR을 활용한 빠른 페이지 로딩
- React Query로 효율적인 데이터 관리
- 반응형 디자인으로 모바일 지원 `;

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // 텍스트가 모두 입력된 후 1초 후에 초기화
      const resetTimeout = setTimeout(() => {
        setText('');
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Convert markdown-like syntax to styled components
  const renderFormattedText = () => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <Typography
            key={index}
            variant="h1"
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              mb: 3,
              mt: index === 0 ? 0 : 4
            }}
          >
            {line.slice(2)}
          </Typography>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <Typography
            key={index}
            variant="h2"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              mb: 2,
              mt: 3
            }}
          >
            {line.slice(3)}
          </Typography>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <Typography
            key={index}
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              '&:before': {
                content: '"•"',
                mr: 1,
                color: 'text.secondary'
              }
            }}
          >
            {line.slice(2)}
          </Typography>
        );
      }
      if (line.trim() === '') {
        return <Box key={index} sx={{ height: '1rem' }} />;
      }
      return (
        <Typography
          key={index}
          sx={{
            mb: 2,
            lineHeight: 1.7
          }}
        >
          {line}
        </Typography>
      );
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          minHeight: '400px'
        }}
      >
        {renderFormattedText()}
        {showCursor && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              bgcolor: 'primary.main',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
              ml: 0.5
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default NotionWritingDemo;