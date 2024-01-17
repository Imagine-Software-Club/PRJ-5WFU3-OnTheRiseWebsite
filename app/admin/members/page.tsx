"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberRow from "../../../src/components/AdminRows/memberRow";
import CreateMember from "@/src/components/Forms/createMember";

// Function to fetch data
async function getData() {
  // Fetch OTR Members Info
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/members");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

function MembersPage() {
  const [otrMembers, setOtrMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setOtrMembers(result["Members"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const memberRow = otrMembers.map((member, index) => {
    const { Role, Name, Major, Image } = member;

    if (Name) {
      return <MemberRow key={index} name={Name} role={Role} major={Major} image={Image} />;
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

  // Output the member rows
  return (
    <Box style={containerStyles}>
      <CreateMember name="" role="" major="" image="" />
      <br/>
      <br/>
      {memberRow.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row}
        </Box>
      ))}
    </Box>
  );
}

export default MembersPage;
export const dynamic = "force-dynamic";
