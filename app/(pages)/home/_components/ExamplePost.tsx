import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';

const works = [
  {
    id: 1,
    title: 'Profiler로 렌더링 속도 개선하기',
    description: 'Profiler는 렌더링 속도를 개선하는 데 도움이 되는 도구입니다. 이 포스트에서는 Profiler를 사용하여 렌더링 속도를 개선하는 방법을 설명합니다.',
    imageUrl: 'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9107bdd8-9601-4127-af95-dfea4fa18894%2F2f38b9ba-794b-4c01-a743-53f164fd8c9e%2Fimg.jpg?table=block&id=163e895f-ae86-80b7-9b94-ed4a3ec2ecb3&cache=v2',
    url:"https://www.nextblog.me/YoungCheon%20Kim/163e895f-ae86-80b7-9b94-ed4a3ec2ecb3"
},
  {
    id: 2,
    title: 'React-Query 캐싱 활용하기',
    description: 'React-Query는 데이터 캐싱을 통해 렌더링 속도를 개선하는 데 도움이 되는 도구입니다. 이 포스트에서는 React-Query를 사용하여 렌더링 속도를 개선하는 방법을 설명합니다.',
    imageUrl:"https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F9107bdd8-9601-4127-af95-dfea4fa18894%2Ffc61bf19-c7ad-4b61-b74b-5572d10956f5%2Fimage.png?table=block&id=163e895f-ae86-8015-a966-fe0b74e618aa&cache=v2",
    url:"https://www.nextblog.me/YoungCheon%20Kim/163e895f-ae86-8015-a966-fe0b74e618aa"
},
];

const PortfolioGrid = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: 'text.secondary',
          fontSize: { xs: '.75rem', md: '1rem' },
        }}
      >
        포스트
      </Typography>
      
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          fontSize: { xs: '1.8rem', md: '3rem' },
          fontWeight: 'bold',
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
       당신의 기록이 블로그가 되는 순간
        <br />
        
      </Typography>

      <Grid container spacing={4}>
        {works.map((work) => (
          <Grid item xs={12} md={6} key={work.id}>
            <a href={work.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 'none',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                transform: 'scale(1.05)', 
                boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                image={work.imageUrl}
                alt={work.title}
                sx={{
                  height: 300,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
              <CardContent sx={{ flexGrow: 1, pt: 3, pl: 1.5 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 'bold' }}
                >
                  {work.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {work.description}
                </Typography>
              </CardContent>
            </Card>
            </a>    
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PortfolioGrid;
