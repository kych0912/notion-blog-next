import { Box } from '@mui/material';

import { WriteFunnelContainer } from '../../write.styles';

import PreRender from './_components/PreRender';

//UI 렌더링
export default function NotionPageContent() {
  return (
    <WriteFunnelContainer>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          pb: '6rem',
        }}
      >
        <PreRender />
      </Box>
    </WriteFunnelContainer>
  );
}
