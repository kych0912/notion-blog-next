import { Box } from "@mui/material";
import Header from "@/app/components/header/Header";

export default function WritePostLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
        }}>
            <Header/>
            <Box sx={{
                display: "flex",
                height:"100%",
                flex: 1,
            }}>
                {children}
            </Box>
        </Box>
    );
}