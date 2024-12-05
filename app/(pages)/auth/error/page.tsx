'use client'

import { useSearchParams } from 'next/navigation'
import { Box, Typography, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

const errorMessages = {
    EmailRequired: "GitHub 계정에 공개 이메일이 설정되어 있지 않습니다. GitHub 프로필 설정에서 이메일을 공개로 설정해주세요.",
    InvalidProfile: "프로필 정보가 올바르지 않습니다.",
    DatabaseError: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    Default: "로그인 중 오류가 발생했습니다."
}

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    
    const handleGitHubSettings = () => {
        window.open('https://github.com/settings/emails', '_blank');
    }
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: 3
        }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                로그인 오류
            </Typography>
            <Typography sx={{ mb: 3, textAlign: 'center' }}>
                {errorMessages[error as keyof typeof errorMessages] || errorMessages.Default}
            </Typography>
            
            {error === 'EmailRequired' && (
                <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    onClick={handleGitHubSettings}
                    sx={{
                        color:'white',
                        backgroundColor: '#24292e',
                        '&:hover': {
                            backgroundColor: '#2c3238',
                        }
                    }}
                >
                    GitHub 이메일 설정으로 이동
                </Button>
            )}
        </Box>
    )
}