import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Edit, Share, Language } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Feature from './Feature';
import NotionWritingDemo from './Notion/NotionWrite';
import NotionCopy from './Notion/NotionCopy';
import NotionUpload from './Notion/NotionUpload';

const features = [
  {
    icon: <Edit />,
    title: "1. 노션에서 작성",
    description: "평소처럼 노션에서 글을 작성하세요",
    demo: <NotionWritingDemo />,
    image: "/Image/Write.png"
  },
  {
    icon: <Share />,
    title: "2. 링크 복사",
    description: "노션 페이지 링크를 복사하세요",
    demo: <NotionCopy />,
    image: "/Image/Copy.png"
  },
  {
    icon: <Language />,
    title: "3. 링크 입력 후 발행",
    description: "노션 페이지를 입력하고 포스트로 변환해요",
    image: "/Image/Upload.png",
    demo: <NotionUpload />
  }
];

const HowItWorks = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            bgcolor: 'background.default',
            py: { xs: 5, md: 15 },
          }}
        >
          {/* 왼쪽 고정 섹션 */}
          <Box
            sx={{
              position: { xs: 'static', md: 'sticky' },
              top: '10rem',
              height: '20vh',
              flex: '0 0 50%',
              bgcolor: 'background.default',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: 'text.secondary' }}>
                노션 블로그 발행 방법
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 'bold', mb: 4 }}>
                3단계로 시작하기
              </Typography>
            </Box>
          </Box>

          {/* 오른쪽 스크롤 섹션 */}
          <Box
            sx={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              py: 6,
            }}
          >
            <Grid container spacing={6}>
              {features.map((feature, index) => {
                const controls = useAnimation();
                const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-100px 0px' });

                React.useEffect(() => {
                  if (inView) {
                    controls.start('visible');
                  }
                }, [controls, inView]);

                return (
                  <Grid item xs={12} key={index}>
                    
                      <motion.div
                        ref={ref}
                        animate={controls}
                        initial="hidden"
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: 50 }
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Feature {...feature} />
                      </motion.div>
                    
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;