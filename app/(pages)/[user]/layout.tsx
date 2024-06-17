import { Box, Card } from "@mui/material";
import CardLayout from "@/app/Layout/CardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <CardLayout>
            {children}
    </CardLayout>
  );
}
