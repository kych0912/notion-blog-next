import { Box, styled, Typography } from "@mui/material";
import { useTransform } from "framer-motion";
import Image from "next/image";
import { motion } from "framer-motion";
import BlogImage from "./BlogImage";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  demo?: React.ReactNode;
}


export default function Feature({ title, description, image, demo }: FeatureProps) {

  return (
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          backgroundColor: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        {demo && demo}
        
        {!demo && <Box sx={{ position: 'relative', width: '100%', height: '17.5rem', borderRadius: '24px' }}>
          <CustomImage
            src={image || '/Default_Image.jpeg'}
            alt={title} 
            layout="fill"
            objectFit="cover"
          />
        </Box>}

        <Box sx={{pl:1}}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            {title}
          </Typography>
          <Typography 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>
        </Box>

      </Box>
  );
}

const CustomImage = styled(Image)`
  border-radius: 24px;
`;
