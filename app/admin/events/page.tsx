
import { Box } from "@mui/material";
import React from "react";
import EventRow from "../../../src/components/AdminRows/eventRow";
import CreateEvent from "@/src/components/Forms/createEvent";  // Correct import statement

// Function to fetch data
async function getData() {
  // Fetch OTR Members Info
  const res = await fetch("http://127.0.0.1:8000/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MembersPage() {
  const data = await getData();
  const otrEvents = data["Events"];

  const eventRow = otrEvents.map((event, index) => {
    const name = event["Name"];
    const date = event["Date"];
    const description = event["Description"];
    const type = event["Type"];
    const pictures = event["Pictures"];
    const keyWords= event["Key_Words"];

    if (name) {
      return <EventRow key={index} name={name} date={date} description={description} type={type} pictures = "" keyWords = ""/>;
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
      <CreateEvent name = "" description = "" date = "" type = ""/> 
      {eventRow.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row}
        </Box>
      ))}
    </Box>
  );
}

export const dynamic = "force-dynamic";
