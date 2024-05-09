import Image from "next/image";
import styles from "./styles/page.module.css";
import { Typography } from "@mui/material";
import {Feed} from './components/feed'
import Header from './components/Header'
import HomeTab from "./components/HomeTab";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>
      <HomeTab/>
      <Feed/>
    </main>
  );
}
