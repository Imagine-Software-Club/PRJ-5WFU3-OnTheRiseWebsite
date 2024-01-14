import { Box, Grid } from "@mui/material";
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
  const otrMembers = data["Members"];

  // Sort otrMembers alphabetically based on names
  const sortedMembers = otrMembers.sort((a, b) => a.Name.localeCompare(b.Name));

  const memberCards = sortedMembers.map((member, index) => {
    const name = member["Name"];
    const role = member["Role"];
    const image = member["Image"]

    if (name) {
      return <MemberCard key={index} name={name} position={role} imageUrl={image} />;
    }
    return null;
  });

  return (
    <Box sx={{ textAlign: "center", margin: "20px 0" }}>
      <br />
      <br />
      <Grid container spacing={2} justifyContent="center">
        {memberCards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} sx={{ textAlign: "center" }}>
            {card}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const dynamic = "force-dynamic";
