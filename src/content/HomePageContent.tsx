import { Box, Stack, Typography } from "@mui/material";

import ExecutiveBoard from "../components/HomePage/ExecutiveBoard";
import OurMission from "../components/HomePage/OurMission";
import ContactUs from "../components/HomePage/ContactUs";
import EventsHome from "../components/HomePage/EventsHome";
import { Introduction } from "../components/HomePage/Introduction";

export const HomePageContent = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* <Introduction /> */}
      <OurMission />
      <EventsHome />
      <ContactUs />
    </Stack>
  );
};

export default HomePageContent;