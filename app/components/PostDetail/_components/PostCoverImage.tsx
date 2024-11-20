import { DEFAULT_IMAGE } from "@/app/styles/DefaultImage";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function PostCoverImage({coverImg}:{coverImg:string}){
    return(
        <Box sx={{width:"100%", height:"20rem", position:"relative"}}>
            <Image 
                src={coverImg || DEFAULT_IMAGE}
                alt="coverImg"
                fill
                style={{
                    objectFit:"cover",
                    objectPosition:"center",
                    borderRadius:"1rem",
                }}
            />
        </Box>
    )
}