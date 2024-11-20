import {Box, Typography, Avatar} from "@mui/material";
import { Skeleton } from "@mui/material";
import { DEFAULT_IMAGE } from "@/app/styles/DefaultImage";

function dateFormat(date:Date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    
    var dateString = year + '-' + month  + '-' + day;
	return dateString;
}

export default function PostCard({id,user,caption,date,title,image,avatar,isLoading = false}:{
    id:string,
    user:string,
    caption:string,
    date:Date,
    title:string,
    image:string,
    avatar:string,
    isLoading?:boolean
}){

    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            transition:'transform .25s ease-in',
            width:"100%",
            borderRadius:'0.5rem',
            backgroundColor:"#fff"
        }}
        >
            {
                isLoading?
                <Skeleton variant="rounded" width="100%" height="100%" animation="wave"/>
                :
                <a href={`/${user}/${id}`} style={{ textDecoration: "none"}}>
                    <Box sx={{width:"100%"}}>
                    {
                        image !== "null"?
                        <img className="feedImg" src={image} alt={title}/>:
                        <img className="feedImg" src={DEFAULT_IMAGE} alt={title}/>
                    }
                    </Box>
                    <Box sx={{p:'1rem',width:"100%"}}>
                        <Box sx={{}}>
                            <Typography sx={{fontSize:'1rem',fontWeight:700,color:"black"}}>{title}</Typography>
                            <Box>
                                <Typography 
                                    style={{WebkitLineClamp:3,WebkitBoxOrient:'vertical'} as any}
                                    sx={{
                                        fontSize:'0.875rem',
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        height:'4rem',
                                        wordWrap:"break-word",
                                        wordBreak:"break-word",
                                        color:"black",
                                        mt:1
                                    }}>
                                    {caption}
                                </Typography>
                            </Box>
                            <Typography sx={{fontSize:"0.75rem",color:"black"}}>{dateFormat(new Date(date))}</Typography>
                        </Box>
                        <Box sx={{display:'flex',alignItems:"center",pt:1}}>
                            <Avatar src={avatar?avatar:""} sx={{width:"1.5rem",height:"1.5rem"}}/>
                            <Typography sx={{fontSize:"0.75rem",ml:1.5,color:"black",overflow:'hidden',textOverflow:'ellipsis'}}>{user}</Typography>
                        </Box>
                    </Box>
                </a>
            }
        </Box>
    )
}