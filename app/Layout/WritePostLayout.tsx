import { Box } from "@mui/material";


export default function WritePostLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <Box sx={{
            width:"100%",
            height:"100%"
        }}>
            <Box sx={{
                display:"flex",
                width:"100%",
                height:"100%"
            }}>
                {children}
            </Box>
        </Box>
    );
    }