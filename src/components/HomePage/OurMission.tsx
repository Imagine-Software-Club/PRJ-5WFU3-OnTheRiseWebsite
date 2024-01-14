"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OnTheRise from "../../../public/images/ontherisegroup.png";
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

async function getData() {
  // Fetch OTR Members Info
  const res = await fetch("http://127.0.0.1:8000/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

interface IEventCardProps {
  name: string;
  date: string;
  imageUrl?: string;
}

const EventCard: React.FC<IEventCardProps> = ({ name, date, imageUrl }) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="center"
      sx={{ flexGrow: 1, flexBasis: "50%", mb: "3%" }}
    >
      <img
        src={imageUrl || OnTheRise}
        style={{ width: "auto", height: "auto" }}
      />
      <Typography
        sx={{ fontSize: "24px", mt: 1, fontFamily: acme.style.fontFamily }}
      >
        {name}
      </Typography>
    </Stack>
  );
};

interface IUpcomingCardProps {
  name: string;
  date: string;
}


const UpcomingCard: React.FC<IUpcomingCardProps> = ({ name, date }) => {
  return (
    <Box sx={{ background: "#DFDFDB", mb: "3%", px: 4, py: 2 }}>
  
          <Typography
            sx={{
              fontSize: "18px",
              fontFamily: acme.style.fontFamily,
              textAlign: "center", // Centering the text
              marginBottom: "5px", // Adjusting margin
            }}
          >
            {name}
          </Typography>


      <Typography
        sx={{
          fontSize: "15px",
          fontFamily: acme.style.fontFamily,
          textAlign: "center", // Centering the text
          marginBottom: "5px", // Adjusting margin
        }}
      >
        Date: {date}
      </Typography>
    </Box>
  );
};



const OurMission: React.FC<IOurMissionProps> = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  const otrEvents = data["Events"] || [];

  const pastEvents = otrEvents
    .filter((event: any) => new Date(event["Date"]) < new Date())
    .slice(0, 5);

  const upcomingEvents = otrEvents
    .filter((event: any) => new Date(event["Date"]) >= new Date())
    .slice(0, 5);

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

      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Paper sx={{ width: { xs: "100%", md: "60%" }, height: "fit-content" }}>
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
            {pastEvents.map((event: any, index: any) => {
              const name = event["Name"];
              const date = event["Date"];
              const thumbnail = event["Thumbnail"];

              if (name) {
                return <EventCard key={index} name={name} imageUrl={thumbnail} />;
              }
            })}
          </Stack>
        </Paper>
        <Paper sx={{ width: { xs: "100%", md: "40%" } }}>
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
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event: any, index: any) => {
                const name = event["Name"];
                const date = event["Date"];

                if (name) {
                  return <UpcomingCard key={index} name={name} date={date} />;
                }
              })
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: acme.style.fontFamily,
                  textAlign: "center",
                }}
              >
                No Upcoming Events
              </Typography>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default OurMission;
