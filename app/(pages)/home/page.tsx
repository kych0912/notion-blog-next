'use client'

import React, { useRef } from 'react';
import { 
  Box, 
  Container, 
} from '@mui/material';

import FeaturedBlog from './_components/BlogCard';
import HeroSection from './_components/HeroSection';
import HowItWorks from './_components/HowItWork';
import CTASection from './_components/CTASection';
import ExamplePost from './_components/ExamplePost';
import NotionWritingDemo from './_components/Notion/NotionWrite';
import CircularScore from './_components/CircleScore';

const LandingPage = () => {

  const featuredBlogs = [
    {
      id: '1',
      title: '노션 페이지가 블로그 포스트로',
      summary: `노션에서 작성한 페이지가 블로그 포스트로 발행돼요.\n노션 페이지 링크를 복사하고 발행하면 끝!`,
      image: '/Image/Post.png',
      category: '노션 블로그'
    },
    {
      id: '2',
      title: 'SEO는 당연히 100점',
      summary: '블로그의 검색 엔진 최적화는 당연히 100점이죠.',
      image: '/Image/SEO.png',
      category: '노션 블로그',
    },

  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection /> 

      {/* Featured Blogs */}
      <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          {featuredBlogs.map((blog, index) => (
            <FeaturedBlog blog={blog} index={index} key={index} />
          ))}
        </Container>
      </Box>

      {/* How it Works */}
      <HowItWorks />

      {/* Example Post */}
      <ExamplePost />

      {/* CTA Section */}
      <CTASection /> 
    </>
  );
};

export default LandingPage;