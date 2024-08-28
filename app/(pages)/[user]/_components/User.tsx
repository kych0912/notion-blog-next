import {Box,Typography,Avatar} from '@mui/material'
import CoverImage from './CoverImage'


export default function User({id,avatar}:{id:string,avatar:string}){

    return(
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
            mt:"-60px"
        }}> 
                <Box sx={{
                    display:"flex",
                    justifyContent:"start",
                    alignItems:"center",
                    flexDirection:'column',
                    width:"100%"
                }}>
                    <Avatar sx={{width:128,height:128}} src={`${avatar ? avatar:''}`}/>
                    <Typography sx={{
                        fontSize:"1.5rem",
                        fontWeight:700,
                        pl:0,
                        pt:2
                    }}>{decodeURIComponent(id)}</Typography>
                </Box>

        </Box>
    )
}