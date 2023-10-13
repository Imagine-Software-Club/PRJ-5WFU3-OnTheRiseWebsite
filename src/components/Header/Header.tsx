import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <Stack
      sx={{
        background: "grey",
        height: "80px",
        borderBottom: "1px solid gold",
        position: "sticky",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        flexDirection: "row",
      }}
    >
      <Typography>On The Rise Website MSU</Typography>
    </Stack>
  );
};

export default Header;
