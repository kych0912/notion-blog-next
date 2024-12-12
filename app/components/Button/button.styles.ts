import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

interface ButtonProps {
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    theme?: Theme;
}

const buttonSizes = {
    small: {
        padding: '6px 12px',
        fontSize: '0.875rem',
        borderRadius: '0.75rem',
    },
    medium: {
        padding: '8px 16px',
        fontSize: '1rem',
        borderRadius: '1rem',
    },
    large: {
        padding: '12px 24px',
        fontSize: '1.125rem',
        borderRadius: '1.25rem',
    },
};

export const BaseButton = styled('button')<ButtonProps>(({ theme, disabled, size = 'medium' }) => ({
    cursor: 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s ease',
    fontWeight: 500,
    border: 'none',
    outline: 'none',
    fontFamily: 'var(--font-pretendard)',
    ...buttonSizes[size], // size에 따른 스타일 적용
}));

export const HoverButton = styled(BaseButton)(({ theme, disabled }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    
    '&:hover': {
        border: disabled 
            ? `2px solid ${theme.palette.primary.main}` 
            : `2px solid ${theme.palette.primary.main}`,
        backgroundColor: disabled 
            ? 'transparent' 
            : theme.palette.primary.main,
        color: disabled 
            ? theme.palette.primary.main 
            : '#ffffff',
    },
}));

export const ContainedButton = styled(BaseButton)(({ theme, disabled }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    
    '&:hover': {
        backgroundColor: disabled 
            ? theme.palette.primary.main 
            : theme.palette.primary.dark,
        border: `2px solid ${
            disabled 
                ? theme.palette.primary.main 
                : theme.palette.primary.dark
        }`,
    },
}));  
