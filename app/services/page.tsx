"use client";

import React, { useEffect, useState } from "react";
import { TextField, Typography, Button, Box, Container, Link } from "@mui/material";

interface Service {
  Title: string;
  Keywords?: string;
  Link: string;
  Description?: string;
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/services");
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }
        const result = await res.json();

        setData(result["Services"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const filteredServices = data.filter((service) => {
    if (service && service.Title) {
      const titleMatch = service.Title.toLowerCase().includes(searchTerm.toLowerCase());

      if (service.Keywords && typeof service.Keywords === 'string') {
        const keywordsMatch = service.Keywords.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || keywordsMatch;
      }

      return titleMatch;
    }

    return false;
  });

  return (
    <Container maxWidth="md" style={{ marginTop: "5%", marginBottom: "5%" }}>
      <Box p={4} bgcolor="#f5f5f5" borderRadius={10} textAlign="center">
        <Typography variant="h4" style={{ color: "green", marginBottom: "3%", fontFamily: "cursive" }}>
          Who We Work With!
        </Typography>

        <TextField
          label="Search by title or keyword"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />

        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <Box key={index} mt={3}>
              <Typography variant="h5" component="div" style={{ marginBottom: "1%" }}>
              <Link href={service.Link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "blue" }}>
                {service.Title}
              </Link>
              </Typography>
              <Typography variant="body1" style={{ fontStyle: "italic", color: "#555" }}>
                {service.Description || "No description available"}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No services found.</Typography>
        )}

        <Button href="/contact-us" style={{ marginTop: "2rem", backgroundColor: "green", color: "white" }}>
          Interested, Work With Us!
        </Button>
      </Box>
    </Container>
  );
};

export default Services;
