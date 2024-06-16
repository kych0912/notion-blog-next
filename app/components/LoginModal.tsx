'use client';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import {Box,Modal,Typography,Input,Button,styled,CircularProgress} from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import CloseIcon from '@mui/icons-material/Close';
import { useLogin } from "../react-query/user/mutations";
import { useRouter } from "next/navigation";
import ErrorSnackbar from "./Error/Error";
import React from "react";
import { AxiosError } from "axios";

const ModalStyled={
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0px',
    width:{sm:"500px",xs:"100%"},
    height:{sm:"530px",xs:'100%'},
    boxShadow: 24,
    borderRadius:{sm:'1rem',xs:'0px'},
    p: 4,
}

export const CustomButton = styled(Button)({
    color:'white',
    height:"3rem",
    borderRadius:'50px',
    width:"100%",
    fontWeight:700,
    fontSize:"1rem",
    boxShadow:'none',
    ":hover":{
        boxShadow:'none'
    }
})

export default function LoginModal({open,setOpen}:{
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}){
    const [erroMessage,setErrorMessage] = React.useState<string>("")    

    const {
        mutate,
        isPending,
        isError,
        error
    } = useLogin();

    const {
        register,
        handleSubmit
    } = useForm()

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = (data: {
        id: string,
        password: string
    }) => {
        mutate(data);
    }

    React.useEffect(()=>{
        switch((error as AxiosError)?.response?.status){
            case 401:
                setErrorMessage("아이디 혹은 비밀번호가 일치하지 않습니다.")
                break;
            case 500:
                setErrorMessage("서버 에러가 발생했습니다.")
                break;
            default:
                setErrorMessage("알 수 없는 에러가 발생했습니다.")
                break;
        }
    },[isError])

    return( 
        <>   
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ '& .Mui-focused': { outline: 'none' } }}
            >  
                <Box sx={ModalStyled}>

                    <Form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
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

                            <Input {...register("id",{ required: true })} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500'}}/> 
                            <Input type="password" {...register("password",{ required: true })} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500',mt:2}}/> 

                        </Box>

                        <Box sx={{width:"100%",display:'flex',justifyContent:"center",alignItems:"center"}}>
                        {
                            isPending?
                            <CircularProgress color="primary"/>:
                            <CustomButton type="submit" variant="contained">
                                로그인
                            </CustomButton>
                        }

                        
                        </Box>

                    </Form> 

                    {
                        isError&&
                        <ErrorSnackbar message={erroMessage}/>
                    }
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
