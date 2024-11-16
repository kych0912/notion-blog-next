import { Box } from "@mui/material";
import {
    PostActionBarContainer
} from "../../write.styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PostActionBar(){
    return(
        <PostActionBarContainer>
            <div>
                <ArrowBackIcon/>
                <span>뒤로가기</span>
            </div>

            <div>
                <span>완료</span>
            </div>
        </PostActionBarContainer>
    )
}


