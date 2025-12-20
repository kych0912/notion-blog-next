import { Suspense } from 'react'
import { Box, Typography } from '@mui/material'

import ErrorPage from './_components/Error'

export default function Page() {

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
        <Suspense fallback={<div>Loading...</div>}> 
            <ErrorPage />
        </Suspense>
    </Box>
    )
}