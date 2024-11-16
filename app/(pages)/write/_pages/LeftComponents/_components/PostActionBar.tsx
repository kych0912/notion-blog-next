import {
    PostActionBarContainer,
    PostActionBarButtonContainer
} from "../../../write.styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from "@mui/material";
import { ContainedButton } from "@/app/components/Button/button.styles";
import { useRouter } from "next/navigation";

export default function PostActionBar(){
    const router = useRouter();
    return(
        <PostActionBarContainer>
            <PostActionBarButtonContainer
                onClick={()=>{
                    router.push('/');
                }}
            >
                <ArrowBackIcon sx ={{mr:1}}/>
                <Typography>뒤로가기</Typography>
            </PostActionBarButtonContainer>

            <ContainedButton
                size="medium"    
                disabled={true}
            >
                <Typography>작성</Typography>
            </ContainedButton>
        </PostActionBarContainer>
    )
}


