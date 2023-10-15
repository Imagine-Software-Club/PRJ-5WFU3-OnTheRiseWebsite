import { Box, Stack, Typography } from "@mui/material";
import OnTheRiseLogo from "../../public/images/OnTheRiseLogo.png";
import Image from "next/image";

export const HomePageContent = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Image
        src={OnTheRiseLogo}
        alt=""
        style={{
          width: "auto",
          height: "auto",
          objectFit: "fill",
        }}
      />
    </Stack>
  );
};

export default HomePageContent;
