"use client";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberCard from "../../src/components/Cards/MemberCard";

interface IMember {
  Name: string;
  Role: string;
  Image: string;
  // Add other properties as needed
}

function MembersPage() {
  const [data, setData] = useState<IMember[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/members");
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result.Members || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Sort otrMembers alphabetically based on names
  const sortedMembers = data.sort((a, b) => a.Name.localeCompare(b.Name));

  const memberCards = sortedMembers.map((member, index) => {
    const name = member.Name;
    const role = member.Role;
    const image = member.Image;

    if (name) {
      return <MemberCard key={index} name={name} position={role} imageUrl={image} />;
    }
    return null;
  });

  return (
    <center>
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
    </center>
  );
}

export default MembersPage;
export const dynamic = "force-dynamic";
