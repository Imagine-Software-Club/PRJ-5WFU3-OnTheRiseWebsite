import { Box, Typography } from "@mui/material";
import React from "react";
import EventCard from "../../src/components/Cards/EventCard";
import EventButtons from "../../src/components/EventButtons";

{
  /* Fetch data for upcoming and past events */
}
async function getUpcoming() {
  const res = await fetch("http://127.0.0.1:8000/upcoming");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UpcomingEventsPage() {
  {
    /* Store upcoming events */
  }

  const data = await getUpcoming();

  const otrUpcoming = data["Upcoming Events"];

  const eventCards = otrUpcoming.map((event, index) => {
    const name = event["Name"];
    const date = event["Date"];
    const description = event["Description"];
    const keyWords = event["Key_Words"];
    const type = event["Upcoming"];

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
      {/* Upcoming Events */}
      <Box>
        {/* <EventsHeader /> */}
        <br></br>
        <br></br>
          <EventButtons />
        <br></br>
        <center>
          <br></br>
          <Typography variant="h5" sx={{ color: "black", my: 2 }}>
          Upcoming Events
        </Typography>
        </center>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {eventCards.map((card, index) => (
            <Box key={index} margin="0 10px 20px 10px" width="250px">
              {card}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
