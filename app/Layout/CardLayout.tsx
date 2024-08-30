import { Box } from "@mui/material";

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Box sx={{
        height:"100%"
    }}>  
        <Box sx={{
            p:2
        }}>
              <Box sx={{
                px:'1rem',
                pb:'1.5rem',
                py:'3rem',
                maxWidth:"56rem",
                backgroundColor:'white',
                margin:"0 auto",
            }}>
              {children}
            </Box>
        </Box>
    </Box>
  );
}
