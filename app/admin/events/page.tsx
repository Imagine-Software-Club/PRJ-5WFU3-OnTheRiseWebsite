"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import EventRow from "../../../src/components/AdminRows/eventRow";
import CreateEvent from "@/src/components/Forms/createEvent";

// Function to fetch data
async function getData() {
  // Fetch OTR Members Info
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

function MembersPage() {
  const [otrEvents, setOtrEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setOtrEvents(result["Events"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const eventRow = otrEvents.map((event, index) => {
    const { Name, Date, Description, Thumbnail, Time } = event;

    if (Name) {
      return <EventRow key={index} name={Name} date={Date} description={Description} thumbnail={Thumbnail} time={Time} />;
    }
    return null;
  });

  // Create rows with centered content, evenly spread across the page's width
  const containerStyles = {
    display: "flex",
    flexDirection: "column", // Display rows vertically
    alignItems: "center", // Center rows horizontally
    margin: "75px",
  };

  const rowStyles = {
    marginBottom: "10px", // Add 10px margin between rows
  };

  // Output the event rows
  return (
    <Box style={containerStyles}>
      <CreateEvent name="" description="" date="" time="" thumbnail="" />
      <br/>
      <br/>
      {eventRow.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row}
        </Box>
      ))}
    </Box>
  );
}

export default MembersPage;
export const dynamic = "force-dynamic";
