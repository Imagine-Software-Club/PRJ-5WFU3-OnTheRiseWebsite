import { Box } from "@mui/material";
import React from "react";
import MemberRow from "../../../src/components/AdminRows/memberRow";

// Function to fetch data
async function getData() {
  // Fetch OTR Members Info
  const res = await fetch("http://127.0.0.1:8000/members");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MembersPage() {
  const data = await getData();
  const otrMembers = data["OTR Members"];

  const memberRow = otrMembers.map((member, index) => {
    const name = member["Name"];
    const position = member["Role"];
    const major = member["Major"];

    if (name) {
      return <MemberRow key={index} name={name} position={position} major={major} />;
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
      {memberRow.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row}
        </Box>
      ))}
    </Box>
  );
}

export const dynamic = "force-dynamic";