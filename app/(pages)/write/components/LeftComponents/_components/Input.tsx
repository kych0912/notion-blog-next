import { Typography } from '@mui/material';
import { Box, TextField, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { parsePageId } from 'notion-utils';

import { getRecordMapOptions } from '@/app/react-query/options/notion';
import { ContainedButton } from '@/app/components/Button/button.styles';

import { usePageId } from '../../../hooks/usePageIdContext';
import { InputContainer } from '../../../write.styles';

export default function Input({
  url,
  setUrl,
  handleSubmit,
  isError,
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  isError: boolean;
}) {
  const { pageId, setPageId } = usePageId();
  const { isLoading } = useQuery(getRecordMapOptions(pageId));

  return (
    <InputContainer>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        {'Notion 페이지 주소를'}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        {'입력해주세요.'}
      </Typography>

      <Box
        sx={{
          width: '100%',
          pt: 4,
          position: 'relative',
        }}
      >
        <TextField
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.notion.so/..."
          value={url}
          error={isError}
          sx={{
            color: 'primary.main',
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                backgroundColor: 'transparent',
              },
            },
            '& input': {
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset',
                WebkitTextFillColor: 'inherit',
                backgroundColor: 'transparent !important',
              },
            },
          }}
          InputProps={{
            sx: {
              borderRadius: '12px',
              pr: '110px',
            },
          }}
        />

        <ContainedButton
          onClick={() => {
            handleSubmit();
            setPageId(parsePageId(url) ?? null);
          }}
          disabled={!url?.length || isError || isLoading}
          size="small"
          sx={{ position: 'absolute', right: '20px', bottom: '10px' }}
        >
          {isLoading ? <CircularProgress size={16} color="inherit" /> : '불러오기'}
        </ContainedButton>
      </Box>
    </InputContainer>
  );
}
