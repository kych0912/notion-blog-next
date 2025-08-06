"use client";
import { Box, Modal, Typography, Button, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import Image from "next/image";
import GithubIcon from "../assets/github_logo_icon_147285.svg";
import { signIn } from "next-auth/react";

const ModalStyled = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px",
  width: { sm: "500px", xs: "100%" },
  height: { sm: "200px", xs: "100%" },
  boxShadow: 24,
  borderRadius: { sm: "1rem", xs: "0px" },
  p: 4,
};

export const CustomButton = styled(Button)({
  color: "white",
  height: "3rem",
  borderRadius: "50px",
  width: "100%",
  fontWeight: 700,
  fontSize: "1rem",
  boxShadow: "none",
  backgroundColor: "#171515",
  ":hover": {
    boxShadow: "none",
    backgroundColor: "#171515",
  },
});

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetchAuthCode = () => {
    signIn("github");
    //window.location.assign(AUTHORIZATION_CODE_URL);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ "& .Mui-focused": { outline: "none" } }}
      >
        <Box sx={ModalStyled}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Box
                sx={{ width: "100%", display: "flex", justifyContent: "end" }}
              >
                <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
              </Box>

              <Typography sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
                로그인
              </Typography>
            </Box>

            <CustomButton
              onClick={fetchAuthCode}
              type="submit"
              variant="contained"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 4,
                  width: "100%",
                }}
              >
                <Image
                  src={GithubIcon}
                  alt="github"
                  style={{ width: "1rem", height: "1rem", marginRight: "10px" }}
                />
                깃허브로 로그인
              </Box>
            </CustomButton>
          </Box>

          {/* {
                        isError&&
                        <ErrorSnackbar message={erroMessage}/>
                    } */}
        </Box>
      </Modal>
    </>
  );
}

const Form = styled("form")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "space-between",
  alignItems: "center",
});
