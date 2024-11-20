import { Grid } from "@mui/material";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    return (
      <Grid container spacing={'16px'} columns={16}>
        {children}
      </Grid>
    );
  }