import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const UnavailableFeaturesBanner = () => {
  const unavailableFeatures = [
    {
      name: '일부 데이터베이스',
      reason: '캘린더, 타임라인, 차트, 폼 데이터베이스 기능을 사용할 수 없어요.',
    },
    {
      name: '비디오',
      reason: `비디오 기능을 사용할 수 없어요. 유튜브 영상은 삽입할 수 있어요.`,
    },
    {
      name: '파일 다운로드',
      reason: '파일을 다운로드할 수 없어요.',
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        border: '1px solid',
        borderColor: 'warning.light',
        backgroundColor: 'warning.50',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Accordion
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': {
              minHeight: 'auto',
              padding: 0,
            },
            '& .MuiAccordionSummary-content': {
              margin: '0 !important',
            },
            '& .MuiAccordionDetails-root': {
              padding: '12px 0 0 0',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  fontSize: 20,
                  color: 'warning.main',
                }}
              />
            }
          >
            <Typography
              sx={{
                flex: 1,
                color: 'warning.dark',
                fontWeight: 400,
                fontSize: '0.75rem',
              }}
            >
              일부 기능을 사용할 수 없어요.
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {unavailableFeatures.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: index !== unavailableFeatures.length - 1 ? 2 : 0,
                  backgroundColor: 'warning.100',
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'warning.dark',
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {feature.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'warning.dark',
                    opacity: 0.8,
                    mb: 0.5,
                  }}
                >
                  {feature.reason}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default UnavailableFeaturesBanner;
