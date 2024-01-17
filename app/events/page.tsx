'use client';

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EventCard from "../../src/components/Cards/EventCard";
import EventButtons from "../../src/components/EventButtons";

async function getUpcoming() {
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/upcoming");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPast() {
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/past");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const EventsPage = () => {
  const [otrUpcoming, setOtrUpcoming] = useState([]);
  const [otrPast, setOtrPast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const upcomingData = await getUpcoming();
      const pastData = await getPast();

      setOtrUpcoming(upcomingData["Upcoming Events"]);
      setOtrPast(pastData["Past Events"]);
    };

    fetchData();
  }, []);

  const renderEventCards = (events: any) => {
    return events.map((event: any, index: any) => (
      <Box key={index} margin="0 10px 20px 0" width="250px">
        <EventCard
          name={event["Name"]}
          date={event["Date"]}
          imageUrl={event["Thumbnail"]}
        />
      </Box>
    ));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center"> {/* Center the content */}
      <EventButtons />
      <Typography variant="h5" sx={{ color: "black", my: 2 }}>
        Upcoming Events
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center"> {/* Center the cards */}
        {renderEventCards(otrUpcoming)}
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center"> {/* Center the content */}
        <Typography variant="h5" sx={{ color: "black", my: 2 }}>
          Past Events
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center"> {/* Center the cards */}
          {renderEventCards(otrPast)}
        </Box>
      </Box>
    </Box>
  );
};

export default EventsPage;
