'use client';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({

	palette: {
            primary: {
                main: "#96C2F7",
            },
            secondary: {
                main: "#f8f9fa",
                dark:'#ebebeb'
            },
        },
        typography: {
            fontFamily: 'Pretendard Variable',
        }
});


export default theme;