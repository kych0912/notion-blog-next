import Box from "@mui/material/Box";

export default function PostCoverImage({coverImg}:{coverImg:string}){
    return(
        <Box sx={{width:"100%"}}>
                
                {
                    coverImg ?
                    <img src={coverImg} alt="coverImg" style={{
                        objectFit:"cover",
                        height:'20rem',
                        objectPosition:"center",
                        borderRadius:"1rem",
                        width:"100%"
                    }}/>
                    :
                    <img src={process.env.DEFAULT_IMAGE} alt="coverImg" style={{
                        objectFit:"cover",
                        height:'20rem',
                        objectPosition:"center",
                        borderRadius:"1rem",
                        width:"100%"
                    }}/>
                }

            </Box>
    )
}