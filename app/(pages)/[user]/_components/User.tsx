import {Box,Typography,Avatar,Divider} from '@mui/material'

export default async function User({user}:{user:string}){
    return(
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
        }}>
            <Box sx={{
                display:"flex",
                justifyContent:"start",
                alignItems:{md:"center",xs:'start'},
                flexDirection:{xs:"column",md:"row"},
            }}>
                <Avatar sx={{width:128,height:128}} src="https://avatars.githubusercontent.com/u/4374977?v=4"/>
                <Typography sx={{
                    fontSize:"1.5rem",
                    fontWeight:700,
                    pl:{md:3,xs:0},
                    pt:{md:0,xs:2}
                }}>{user}</Typography>
            </Box>

            <Divider sx={{width:"100%",mt:5,mb:3}}/>
        </Box>
    )
}