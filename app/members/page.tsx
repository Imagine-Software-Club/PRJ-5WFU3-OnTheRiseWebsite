import { Box } from "@mui/material";
import React from "react";
import MemberCard from "../../src/components/Cards/MemberCard";

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

  const memberCards = otrMembers.map((member, index) => {
    const name = member["Name"];
    const role = member["Role"];
    const image = member["Image"]

    if (name) {
      return <MemberCard key={index} name={name} position={role} imageUrl={image}/>;
    }
    return null;
  });

  // Split the memberCards into rows of 4
  const rows = [];
  for (let i = 0; i < memberCards.length; i += 4) {
    rows.push(memberCards.slice(i, i + 4));
  }

  // Create rows with centered content, evenly spread across the page's width
  const containerStyles = {
    display: "flex",
    flexDirection: "column", // Display rows vertically
    alignItems: "center", // Center rows horizontally
    margin: "75px",
  };

  const rowStyles = {
    display: "flex",
    justifyContent: "space-between", // Spread member cards evenly across the row
    alignItems: "center",
    marginBottom: "50px", // Add 50px margin between rows
  };

  const cardStyles = {
    margin: "0 35px", // Add 25px margin between member cards in a row
  };

  return (
    <Box style={containerStyles}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row.map((card, cardIndex) => (
            <Box key={cardIndex} style={cardStyles}>
              {card}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}


export const dynamic = "force-dynamic";