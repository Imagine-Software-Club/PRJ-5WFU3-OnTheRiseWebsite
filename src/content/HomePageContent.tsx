import { Box, Stack, Typography } from "@mui/material";

import ExecutiveBoard from "../components/HomePage/ExecutiveBoard";
import OurMission from "../components/HomePage/OurMission";
import ContactUs from "../components/HomePage/ContactUs";

export const HomePageContent = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <OurMission />
      <ContactUs />
    </Stack>
  );
};

export default HomePageContent;
