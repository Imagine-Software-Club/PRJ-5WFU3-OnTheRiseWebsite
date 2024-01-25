"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ServiceRow from "../../../src/components/AdminRows/serviceRow";
import CreateService from "@/src/components/Forms/createService";

// Function to fetch data
async function getData() {
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/services");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

function ServicesPage() {
  const [otrServices, setOtrServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setOtrServices(result["Services"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const serviceRow = otrServices.map((service, index) => {
    const { Title, Description, Link, keywords} = service;

    if (Title) {
      return <ServiceRow description={Description} title={Title} link={Link}  keywords = {keywords}/>;
    }
    return null;
  });

  // Create rows with centered content, evenly spread across the page's width
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column", // Display rows vertically
    alignItems: "center", // Center rows horizontally
    margin: "75px",
  };

  const rowStyles = {
    marginBottom: "10px", // Add 10px margin between rows
  };

  // Output the service rows
  return (
    <Box style={containerStyles}>
      <CreateService description="" title="" link=""  keywords = "" />
      
      {serviceRow.map((row, rowIndex) => (
        <Box key={rowIndex} style={rowStyles}>
          {row}
        </Box>
      ))}
    </Box>
  );
}

export default ServicesPage;
export const dynamic = "force-dynamic";
