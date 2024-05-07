import Image from "next/image";
import styles from "./styles/page.module.css";
import { Typography } from "@mui/material";
import {Feed} from './components/feed'
import Header from './components/Header'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>
      <Feed/>
    </main>
  );
}
