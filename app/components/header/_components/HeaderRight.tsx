import { Skeleton, Box } from "@mui/material";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useSession } from "next-auth/react";
import React from "react";

export default  function HeaderRight(){
    const { data:session,status } = useSession();

    switch(status){
        case "loading":
            return(
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Skeleton variant="rounded" width={100} height={40} />
                </Box>
            )
        case "authenticated":
            if(session && session.user){
                window.localStorage.setItem("currentUser",JSON.stringify(session.user));
                return <LoggedIn user={session}/>
            }
            return <NotLoggedIn />
        case "unauthenticated":
            return <NotLoggedIn />
        default:
            return <NotLoggedIn/>
    }
}