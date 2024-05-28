import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Box sx={{
        backgroundColor:'secondary.dark'
    }}>  
        <Box sx={{
            p:2
        }}>
            {children}
        </Box>
    </Box>
  );
}
