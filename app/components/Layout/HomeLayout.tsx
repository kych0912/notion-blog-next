import { Box } from "@mui/material";

export const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}>
        <Box sx={{ px: 2, maxWidth: { md: '900px', lg: "1200px" }, margin: "0 auto", width: "100%" }}>
          {children}
        </Box>
      </Box>
    )
  }