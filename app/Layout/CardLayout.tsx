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
                borderRadius:'1.5rem',
                maxWidth:"56rem",
                backgroundColor:'white',
                boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                margin:"0 auto",
            }}>
              {children}
            </Box>
        </Box>
    </Box>
  );
}
