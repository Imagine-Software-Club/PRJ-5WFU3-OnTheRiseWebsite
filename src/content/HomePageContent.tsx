"use client";
import ContactUs from "../components/HomePage/ContactUs";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OnTheRise from "../../public/images/ontherisegroup.png";


interface IOurMissionProps {}

interface IEventCardProps {
  name: string;
  date: string;
  imageUrl?: string;
}

const EventCard: React.FC<IEventCardProps> = ({ name, date, imageUrl }) => (
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
      sx={{ fontSize: "24px", mt: 1 }}
    >
      {name}
    </Typography>
  </Stack>
);

interface IUpcomingCardProps {
  name: string;
  date: string;
}

const UpcomingCard: React.FC<IUpcomingCardProps> = ({ name, date }) => (
  <Box sx={{ background: "#DFDFDB", mb: "3%", px: 4, py: 2 }}>
    <Typography
      sx={{
        fontSize: "18px",
        textAlign: "center",
        marginBottom: "5px",
      }}
    >
      {name}
    </Typography>
    <Typography
      sx={{
        fontSize: "15px",
        textAlign: "center",
        marginBottom: "5px",
      }}
    >
      Date: {date}
    </Typography>
  </Box>
);

async function getData() {
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

const HomePageContent: React.FC<IOurMissionProps> = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
          mb: "5%",
          textAlign: "center",
        }}
      ></Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Paper
          sx={{
            width: { xs: "100%", md: "60%" },
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              background: "#EFD80A",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            Events
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ p: 2, flexWrap: "wrap" }}
          >
            {pastEvents.map((event: any, index: any) => (
              <EventCard
                key={index}
                name={event["Name"]}
                imageUrl={event["Thumbnail"]}
                date={event["Date"]}
              />
            ))}
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
            }}
          >
            Upcoming Events
          </Box>

          <Stack sx={{ p: 2 }}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event: any, index: any) => (
                <UpcomingCard
                  key={index}
                  name={event["Name"]}
                  date={event["Date"]}
                />
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                No Upcoming Events
              </Typography>
            )}
          </Stack>
        </Paper>
      </Stack>
      <br/>
      <br/>
      <br/>
      <br/>
      <ContactUs/>
    </Stack>
    
  );
};

export default HomePageContent;
