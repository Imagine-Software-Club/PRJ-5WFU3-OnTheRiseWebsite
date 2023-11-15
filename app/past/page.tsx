import { Box, Typography } from "@mui/material";
import React from "react";
import EventCard from "../../src/components/Cards/EventCard";
import EventsHeader from "../../src/components/Header/EventsHeader";
import EventButtons from "../../src/components/EventButtons";

{
  /* Fetch data for upcoming and past events */
}

async function getPast() {
  const res = await fetch("http://127.0.0.1:8000/past");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function EventsPage() {
  {
    /* Store past events */
  }
  const dataPast = await getPast();

  const otrPast = dataPast["Past Events"];

  const eventCardsPast = otrPast.map((event, index) => {
    const name = event["Name"];
    const date = event["Date"];
    const description = event["Description"];
    const keyWords = event["Key_Words"];
    const type = event["Type"];

    if (name) {
      return <EventCard key={index} name={name} date={date} />;
    }
    return null;
  });

  {
    /* Style Page */
  }
  {
    /* Utilizes the Event Card Component in /src/components/cards */
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* <EventsHeader /> */}
      <EventButtons />
      {/* Past Events */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" style={{ color: "white" }}>
          Past Events
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {eventCardsPast.map((card, index) => (
            <Box key={index} margin="0 10px 20px 10px" width="250px">
              {card}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
