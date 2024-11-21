import { Box, Skeleton } from "@mui/material";

export default function PostCardLoading() {
    return (
        <Box sx={{width: "100%"}}>
            {/* 이미지 스켈레톤 */}
            <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={200} 
                sx={{borderRadius: '0.5rem 0.5rem 0 0'}}
            />
            
            <Box sx={{p: '1rem'}}>
                {/* 제목 스켈레톤 */}
                <Skeleton variant="text" width="80%" height={24} />
                
                {/* 본문 스켈레톤 */}
                <Box sx={{mt: 1}}>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </Box>
                
                {/* 날짜 스켈레톤 */}
                <Skeleton variant="text" width="30%" sx={{mt: 1}} />
                
                {/* 유저 정보 스켈레톤 */}
                <Box sx={{display: 'flex', alignItems: 'center', pt: 1}}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={100} sx={{ml: 1.5}} />
                </Box>
            </Box>
        </Box>
    );
}