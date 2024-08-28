import { Box } from "@mui/material";

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Box sx={{p:2}}>
      {children}
    </Box>
  );
}
