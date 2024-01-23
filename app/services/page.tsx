"use client";

import React, { useState } from "react";
import { TextField, Typography, Button, Box, Container } from "@mui/material";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const serviceData = [
    {
      number: 1,
      title: "Potter Park Zoo",
      description: "Email: message@volunteer2mail.com",
      link: "https://potterparkzoo.org",
      keywords: ["zoo", "animals", "volunteer"],
    },
    {
      number: 2,
      title: "City Rescue Mission of Lansing",
      description: "Phone: 517-485-0145",
      link: "https://cityrescuelansing.org",
      keywords: ["rescue", "mission", "Lansing"],
    },
    {
      number: 3,
      title: "LMTS",
      description: "Phone: 517-862-6011",
      link: "https://lmts.org",
      keywords: ["LMTS", "organization"],
    },
    {
      number: 4,
      title: "MMBDS",
      description: "Email: Sheryl@michiganpremierevents.com, Phone: (517) 242-3759",
      link: "https://michiganpremierevents.com",
      keywords: ["MMBDS", "events", "Sheryl"],
    },
  ];

  const filteredServices = serviceData.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredServices.map((service) => (
          <Box key={service.number} mt={3}>
            <Typography variant="h5" component="div" style={{ marginBottom: "1%" }}>
              <a href={service.link} target="_blank" rel="noopener noreferrer">
                {service.title}
              </a>
            </Typography>
            <Typography variant="body1">{service.description}</Typography>
          </Box>
        ))}

        <Button href = "/contact-us">
          Interested, Work With Us!
        </Button>
      </Box>
    </Container>
  );
};

export default Services;
