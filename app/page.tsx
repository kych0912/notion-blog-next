import Image from "next/image";
import styles from "./styles/page.module.css";
import { Box } from "@mui/material";
import {Feed} from './components/feed'
import HomeTab from "./components/HomeTab";

export default function Home() {
  return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"start",
        alignItems:"center",
        minHeight:"100vh",
        backgroundColor:"#f9f9f9"
      }}>
        <Box sx={{ px:2 }}>
            <HomeTab/>
            <Feed/>
        </Box>
    </Box>
  );
}
