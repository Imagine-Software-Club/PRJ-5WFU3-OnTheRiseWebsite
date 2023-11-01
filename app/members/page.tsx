import { Box } from "@mui/material";
import React from "react";
import MemberCard from "../../src/components/Cards/MemberCard";


{/* Function fetches data */}
async function getData() {
  {/* Fetch OTR Members Info */}
  const res = await fetch('http://127.0.0.1:8000/members');
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

{/* Store data for program's use */}
export default async function MembersPage() {
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

  {/* Style Page */}
  {/* Utilizes the Member Card Component in /src/components/cards */}
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