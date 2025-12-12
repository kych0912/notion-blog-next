import { Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import notionHelp from "@/public/notion-help.png"

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
