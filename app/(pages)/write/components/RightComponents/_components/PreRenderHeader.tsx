import { Box } from "@mui/material";
import { ExtendedRecordMap } from "notion-types";

import PostTitle from "@/app/components/PostDetail/_components/PostTitle";

export default function PreRenderHeader({
    recordMap
}: {
    recordMap: ExtendedRecordMap;
}) {


    return (
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
            py:3
        }}>
            <Box sx={{width:"100%"}}>
                <PostTitle recordMap={recordMap}/>
            </Box>

        </Box>
    )
}