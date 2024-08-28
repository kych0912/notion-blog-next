import { Box } from "@mui/material";
import Image from "next/image";

export default async function CoverImage({ src }: { src: string }) {
  return (
    <Box sx={{ position: "relative", maxWidth:"1200px",borderRadius:'24px',width:'100%',height:'30vh' }}>
        <Image
            style={{borderRadius:'24px'}}
            src={src}
            layout="fill"
            objectFit="cover" 
            alt={""} 
        />
    </Box>
  );
}