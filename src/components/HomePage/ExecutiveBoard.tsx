import { Box } from "@mui/material";
import React from "react";

import MemberCard from "../Cards/MemberCard";


interface IExecutiveBoard {}

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/members');
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function ExecutiveBoard() {
  const data = await getData()

  const otrMembers = data['OTR Members'];

  const memberCards = otrMembers.map((member, index) => {
    const name = member['Name'];
    const role = member['Role'];

    if (name) {
      return <MemberCard key={index} name={name} position={role} />;
    }
    return null;
  });

  return (
    <Box display="flex" justifyContent="space-between" margin="0 -10px">
      {memberCards.map((card, index) => (
        <Box key={index} margin="0 100px">
          {card}
        </Box>
      ))}
    </Box>
  );

};
