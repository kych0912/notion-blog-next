'use client'
import { Box } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";

export default function CoverImage({ src }: { src: string }) {
  return (
    <Box sx={{ position: "relative", maxWidth:"1200px",borderRadius:'24px',width:'100%',height:'30vh' }}>
        <CustomImage
            src={src}
            layout="fill"
            objectFit="cover" 
            alt={""} 
        />
    </Box>
  );
}

const CustomImage = styled(Image)`
  border-radius: 24px;

  @media (max-width: 1200px) {
    border-radius: 0;
  }
`;