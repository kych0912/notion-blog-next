import { Box } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";

export default function FeatureImage({ src, alt }: { src: string, alt: string }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '40vh', borderRadius: '24px' }}>
      <CustomImage
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </Box>  
  );
}

const CustomImage = styled(Image)`
  border-radius: 24px;
`;
