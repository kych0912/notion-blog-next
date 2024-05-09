import {Box, Typography, Avatar} from "@mui/material";
import Link from 'next/link'


export default function PostCard(props:any){

    const {title, coverImg, description,publishedTime,user,id} = props.content;

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
            <Link href={`/${user}/${id}`} scroll={true}  style={{ textDecoration: "none"}}>
                <Box sx={{width:"100%"}}>
                {
                    coverImg &&
                    <img className="feedImg" src={coverImg} alt={title}/>||
                    <img className="feedImg" src="https://via.placeholder.com/150" alt={title}/>
                }
                </Box>
                <Box sx={{p:'1rem'}}>
                    <Box>
                        <Typography sx={{fontSize:'1rem',fontWeight:700,color:"black"}}>{title}</Typography>
                        <Typography 
                            style={{WebkitLineClamp:3,WebkitBoxOrient:'vertical'} as any}
                            sx={{
                                fontSize:'0.875rem',
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                height:'4rem',
                                width:"100%",
                                wordWrap:"break-word",
                                wordBreak:"break-word",
                                color:"black",
                                mt:1
                            }}>
                            {description}
                        </Typography>
                        <Typography sx={{fontSize:"0.75rem",color:"black"}}>{publishedTime}</Typography>
                    </Box>
                    <Box sx={{display:'flex',alignItems:"center",pt:1}}>
                        <Avatar sx={{width:"1.5rem",height:"1.5rem"}}/>
                        <Typography sx={{fontSize:"0.75rem",ml:1.5,color:"black"}}>{user}</Typography>
                    </Box>
                </Box>
            </Link>
        </Box>
    )
}