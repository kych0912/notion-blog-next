import Image from "next/image";
import styles from "./styles/page.module.css";
import { Box } from "@mui/material";
import {Feed} from './components/feed'
import Header from './components/Header'
import HomeTab from "./components/HomeTab";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>
      <Box sx={{px:2}}>
        <HomeTab/>
        <Feed/>
      </Box>
    </main>
  );
}
