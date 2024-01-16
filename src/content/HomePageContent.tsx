import { Stack } from "@mui/material";

import OurMission from "../components/HomePage/OurMission";
import ContactUs from "../components/HomePage/ContactUs";

const HomePageContent = () => {
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
