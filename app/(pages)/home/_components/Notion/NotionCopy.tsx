import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Switch,
  IconButton,
  InputBase
} from '@mui/material';
import {
  Link as LinkIcon,
  Settings,
  Search,
  ContentCopy,
  Star,
  AccessTime,
} from '@mui/icons-material';

const NotionShareDialog = () => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [toggleEnabled, setToggleEnabled] = useState(true);

  const handleCopy = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <Box sx={{ maxWidth: 480, width: '100%'}}>
      <Paper
        elevation={2}
        sx={{
          p: 0,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Button 
            size="small"
            sx={{ 
              mr: 1,
              color: 'text.primary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <LinkIcon sx={{ mr: 0.5 }} fontSize="small" />
            사이트 보기
          </Button>
          <Button
            size="small"
            sx={{ 
              mr: 1,
              color: 'text.primary',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Settings sx={{ mr: 0.5 }} fontSize="small" />
            사이트 설정
          </Button>
          <Typography
            sx={{
              px: 2,
              py: 0.5,
              bgcolor: 'action.hover',
              borderRadius: 1,
              fontSize: '0.875rem',
              ml: 'auto'
            }}
          >
            공유
          </Typography>
        </Box>

        {/* Link Section */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2,
            p: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}>
            <InputBase
              value="befitting-jodhpur-407.notion.site"
              sx={{ flexGrow: 1, fontSize: '0.875rem' }}
              readOnly
            />
            <IconButton size="small" sx={{ ml: 1 }} onClick={handleCopy}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Box>
          
          {/* Options */}
          <Box sx={{ '& > div': { mb: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkIcon fontSize="small" />
                <Typography variant="body2">사이트 사용자 지정</Typography>
              </Box>
              <IconButton size="small">
                <Star fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Search fontSize="small" />
                <Typography variant="body2">검색 엔진 인덱싱</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">끄기</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime fontSize="small" />
                <Typography variant="body2">링크 만료 기간</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">없음</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2">템플릿으로 복제</Typography>
              <Switch
                size="small"
                checked={toggleEnabled}
                onChange={(e) => setToggleEnabled(e.target.checked)}
                
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            size="small"
            variant="text"
            sx={{ color: 'text.secondary' }}
          >
            모든 사이트 관리
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            사이트 보기
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotionShareDialog;