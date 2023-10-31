import { Box, Stack, Typography } from "@mui/material";
import OnTheRiseLogo from "../../public/images/OnTheRiseLogo.png";
import SearchIcon from "../../public/images/Search_Icon.jpg";
import Image from "next/image";
import ExecutiveBoard from "../components/ExecutiveBoard";
import OurMission from "../components/OurMission";
import ContactUs from "../components/ContactUs";
import EventsHome from "../components/EventsHome";

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
      <OurMission />
      <EventsHome />
      <ExecutiveBoard />
      <ContactUs />
    </Stack>
  );
};

export default HomePageContent;
