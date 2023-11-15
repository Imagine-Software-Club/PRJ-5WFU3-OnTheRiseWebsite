import { Box } from "@mui/material";
import React from "react";

import MemberCard from "../Cards/MemberCard";

interface IExecutiveBoard {}

{
  /* Function to Fetch Data */
}
async function getData() {
  const res = await fetch("http://127.0.0.1:8000/members");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ExecutiveBoard() {
  {
    /* Fetch OTR Members Info */
  }
  const data = await getData();

  const otrMembers = data["OTR Members"];

  const memberCards = otrMembers.map((member: any, index: number) => {
    const name = member["Name"];
    const role = member["Role"];
    console.log(typeof member);
    if (name) {
      return <MemberCard key={index} name={name} position={role} />;
    }
    return null;
  });

  {
    /* Style Page */
  }
  {
    /* Utilizes the Member Card Component in /src/components/cards */
  }
  return (
    <Box display="flex" justifyContent="space-between" margin="0 -10px">
      {memberCards.slice(0, 3).map((card: any, index: number) => (
        <Box key={index} margin="0 100px">
          {card}
        </Box>
      ))}
    </Box>
  );
}
