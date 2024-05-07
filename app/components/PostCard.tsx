import {Box, Typography} from "@mui/material";

export default function PostCard({title, date, content}:{
    title?: string,
    date?: string,
    content?: string
}){

    return(
        <Box sx={{display:"flex",flexDirection:"column",transition:'transform .25s ease-in',width:"100%"}}>
            {/* <Typography variant="h4">{title}</Typography>
            <Typography variant="subtitle1">{date}</Typography>
            <Typography variant="body1">{content}</Typography> */}
            <Typography variant="h4">{1}</Typography>
            <Typography variant="subtitle1">{2}</Typography>
            <Typography variant="body1">{3}</Typography>
        </Box>

    )
}