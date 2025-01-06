import Box from "@mui/material/Box";
import Image from "next/image";

export default function PostCoverImage({coverImg}:{coverImg:string}){
    const imageSrc = coverImg ? coverImg : "/Default_Image.jpeg";

    return(
        <Box sx={{width:"100%", height:"20rem", position:"relative"}}>
            <Image 
                src={imageSrc}
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