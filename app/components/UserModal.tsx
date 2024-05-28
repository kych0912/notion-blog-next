'use client';
import { useForm } from "react-hook-form"
import {Box,Modal,Typography,Input,Button,styled} from "@mui/material"
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ModalStyled={
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    width:{sm:"500px",xs:"100%"},
    height:{sm:"530px",xs:'100%'},
    boxShadow: 24,
    p: 4,
}

export const CustomButton = styled(Button)({
    color:'white',
    height:"3rem",
    borderRadius:'50px',
    width:"100%",
    fontWeight:700,
    fontSize:"1rem",
})

export default function LoginModal({open,setOpen}:{
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}){
    

    const {
        register,
        handleSubmit
      } = useForm()

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = (data:any) => {
        console.log(data)
    }

    return( 
        <>   
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ '& .Mui-focused': { outline: 'none' } }}
            >  
                <Box sx={ModalStyled}>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{display:"flex",flexDirection:"column",width:"100%"}}>
                            <Box sx={{width:"100%",display:"flex",justifyContent:"end"}}>   
                                <CloseIcon onClick={handleClose} sx={{cursor:'pointer'}}/>
                            </Box>

                            <Typography sx={{fontSize:'1.25rem',fontWeight:700}}>
                                로그인
                            </Typography>

                            <Typography sx={{fontSize:"1rem",fontWeight:700,color:"#868e96",my:2}}>
                                아이디로 로그인
                            </Typography>


                            <Input {...register("id",{ required: true })} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}/> 
                            <Input {...register("password",{ required: true })} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',mt:2}}/> 
                        </Box>

                        <CustomButton variant="contained">
                            로그인
                        </CustomButton>
                    </Form>  

                </Box>

            </Modal>

        </>
    )
}

const Form = styled('form')({
    width:'100%',
    height:"100%",
    display:'flex',
    flexDirection:'column',
    gap:'1rem',
    justifyContent:'space-between',
    alignItems:'start'
})
