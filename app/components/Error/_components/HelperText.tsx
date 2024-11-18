import { Typography } from "@mui/material";

export default function HelperText({message}:{message:string}) {
    return <Typography variant="caption" color="error">{message}</Typography>;
}
