import { Box } from "@mui/material";
import React from "react";
import EventCard from "../../src/components/Cards/EventCard";

interface IEventsHome {}

export const EventsPage: React.FC<IEventsHome> = () => {
  var cards = [];

  for (let i = 1; i <= 20; i++) {
    cards.push(<EventCard key={i} />);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="20px" // Adjust the top margin as needed
    >
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        maxWidth="1200px"
        gap={20} // Adjust the gap property to control the space between cards
      >
        {cards}
      </Box>
    </Box>
  );
};

export default EventsPage;
