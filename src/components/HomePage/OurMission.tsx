import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import OnTheRise from "../../../public/images/ontherisegroup.png"; // Update with the correct path to your image
import Image from "next/image";
import { Acme } from "next/font/google";
interface IOurMissionProps {
  // ... your props if needed
}

const acme = Acme({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const EventCard = () => {
  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      sx={{ flexGrow: 1, flexBasis: "50%", mb: "3%" }}
    >
      <Image
        src={OnTheRise}
        alt="Event"
        style={{ width: "250px", height: "auto" }}
      />
      <Typography
        sx={{ fontSize: "24px", mt: 1, fontFamily: acme.style.fontFamily }}
      >
        Event Description
      </Typography>
    </Stack>
  );
};

const UpcomingCard = () => {
  return (
    <Box sx={{ background: "#DFDFDB", mb: "3%", px: 4, py: 2 }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontFamily: acme.style.fontFamily,
          textAlign: "center",
        }}
      >
        Event Title
      </Typography>
      <Typography
        sx={{ fontSize: "15px", fontFamily: acme.style.fontFamily, mb: "5px" }}
      >
        Location: Event Location
      </Typography>
      <Typography
        sx={{ fontSize: "15px", fontFamily: acme.style.fontFamily, mb: "5px" }}
      >
        Date: Event Date
      </Typography>
      <Typography
        sx={{ fontSize: "15px", fontFamily: acme.style.fontFamily, mb: "5px" }}
      >
        Time: Event Time
      </Typography>
    </Box>
  );
};
const OurMission: React.FC<IOurMissionProps> = () => {
  // ... your data and useEffect if needed

  return (
    <Stack sx={{ mb: "10%", width: "100%" }}>
      <Typography
        sx={{
          fontSize: "50px",
          fontFamily: acme.style.fontFamily,
          mb: "5%",
          textAlign: "center",
        }}
      >
        Our Mission
      </Typography>
      <Stack direction="row" spacing={2}>
        <Paper sx={{ width: "60%", height: "fit-content" }}>
          <Box
            sx={{
              background: "#EFD80A",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontFamily: acme.style.fontFamily,
            }}
          >
            Events
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ p: 2, flexWrap: "wrap" }}
          >
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </Stack>
        </Paper>
        <Paper sx={{ width: "40%" }}>
          <Box
            sx={{
              background: "#EFD80A",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontFamily: acme.style.fontFamily,
            }}
          >
            Upcoming Events
          </Box>
          <Stack sx={{ p: 2 }}>
            <UpcomingCard />
            <UpcomingCard />
            <UpcomingCard />
            <UpcomingCard />
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default OurMission;
