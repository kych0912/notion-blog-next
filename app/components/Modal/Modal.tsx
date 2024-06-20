'use client';
import {Box,Modal,Typography} from "@mui/material"
import {useDeletePostMutation} from "@/app/react-query/post/mutations"
import Error from "@/app/components/Error/Error"

export default function DeleteModal({id,open,handleOpen}: {id:string,open:boolean,handleOpen:()=>void}){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:'7px',
        p: 3,
        outline: 'none',
    };

    const {mutate,isPending,isError} = useDeletePostMutation();

    const handleDelete = () =>{ 
        mutate(id);
    }

    return(
        <>   
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ '& .Mui-focused': { outline: 'none' } }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" sx={{fontWeight:700}}>
                        잠시만요, 확인해주세요!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 0.5,fontWeight:500}}>
                        {"작성하신 게시글이 삭제돼요."}<br/>{"확실하신가요?"}
                    </Typography>

                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mt:1}}>
                        <Box onClick={handleOpen} sx={{backgroundColor:"#D9D9D9",display:"flex",alignItems:"center",justifyContent:"center",width:"140px",borderRadius:'7px',height:'40px'}}>
                            <Typography sx={{color:"black",fontWeight:600}}>
                                취소
                            </Typography>
                        </Box>
                        
                        <Box onClick={handleDelete} sx={{backgroundColor:"primary.main",width:'140px',borderRadius:'7px',height:'40px',display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Typography sx={{color:"white",fontWeight:600}}>
                                삭제
                            </Typography>
                        </Box>

                    </Box>
                </Box>  
            </Modal>
            {
                isError && <Error message="게시글 삭제에 실패했어요."/>
            }
        </>
    )
}