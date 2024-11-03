import { Typography } from "@mui/material";
import { getPageTitle } from "notion-utils";
import { ExtendedRecordMap } from "notion-types";

export default function PostTitle({
    recordMap}
    : Readonly<{
        recordMap: ExtendedRecordMap;
    }>) {
    const title = getPageTitle(recordMap);
    
    return (
        <Typography sx={{
            fontSize:"1.875rem",
            fontWeight:700
        }}>{title}</Typography>
    )
}