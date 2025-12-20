import { Box } from "@mui/material";

import UnavailableFeaturesBanner from "./UnavailableFeaturesBanner"

export default function Information(){
    return(
        <Box sx={{
            mt:2
        }}>
            <UnavailableFeaturesBanner />
        </Box>
    )
}
