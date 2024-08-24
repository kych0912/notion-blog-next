import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function ErrorPage({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const error = searchParams?.error;

    return (
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        }}>
        <h1>{error}</h1>
        </Box>
    );
}
