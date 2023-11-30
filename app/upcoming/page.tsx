'use client';


import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EventCard from "../../src/components/Cards/EventCard";
import EventButtons from "../../src/components/EventButtons";

async function getUpcoming() {
  const res = await fetch("http://127.0.0.1:8000/upcoming");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const EventsPage = () => {
  const [otrUpcoming, setOtrUpcoming] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const upcomingData = await getUpcoming();


      setOtrUpcoming(upcomingData["Upcoming Events"]);

    };

    fetchData();
  }, []);

  const renderEventCards = (events) => {
    return events.map((event, index) => (
      <Box key={index} margin="0 10px 20px 0" width="250px">
        <EventCard
          name={event["Name"]}
          date={event["Date"]}
          description={event["Description"]}
          keyWords={event["Key_Words"]}
          type={event["Upcoming"] || event["Type"]}
        />
      </Box>
    ));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start"> {/* Updated alignment to flex-start */}
      <EventButtons />
      <Typography variant="h5" sx={{ color: "black", my: 2 }}>
        Upcoming Events
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start"> {/* Updated alignment to flex-start */}
        {renderEventCards(otrUpcoming)}
      </Box>

    </Box>
  );
};

export default EventsPage;
