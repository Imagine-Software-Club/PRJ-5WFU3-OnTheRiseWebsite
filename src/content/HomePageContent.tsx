import { Box, Stack, Typography } from "@mui/material";

import OnTheRiseLogo from "../../public/images/OnTheRiseLogo.png";
import Image from "next/image";
import ExecutiveBoard from "../components/HomePage/ExecutiveBoard";
import OurMission from "../components/HomePage/OurMission";
import ContactUs from "../components/HomePage/ContactUs";
import EventsHome from "../components/HomePage/EventsHome";

export const HomePageContent = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
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
      <OurMission />
      <EventsHome />
      <ExecutiveBoard />
      <ContactUs />
    </Stack>
  );
};

export default HomePageContent;
