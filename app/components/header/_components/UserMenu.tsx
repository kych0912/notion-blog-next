import {Box , Button, Typography} from '@mui/material'
import {styled} from '@mui/material/styles';
import Link from 'next/link';

const MenuItem = styled(Box)({
    '&:hover':{
        borderLeft:'4px solid #96C2F7',
        backgroundColor:'#f9f9f9'
    }
})


const UserMenu = ({MenuOption}:{
    MenuOption:{
        title:string,
        link:string,
        handleClick:()=>void
    }[]
}) =>{
    return(
        <Box sx={{display:"flex",
            flexDirection:"column",
            position:"absolute",
            top:'100%',
            right:'0px',
            mt:1
        }}>
            <Box sx={{
                width:"12rem",
                backgroundColor:"#fff",
            }}>
                {
                    MenuOption.map((item,index)=>(
                        <MenuItem onClick={item.handleClick} key={index}>
                            <Typography variant="body1" sx={{
                                color: '#000',
                                p: '.75rem 1rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}>
                                {item.title}
                            </Typography>
                        </MenuItem>
                    ))
                }
            </Box>
        </Box>
    )
}

export default UserMenu;