import { Box, Typography } from "@mui/material";
import React from "react";
import ServiceCard from "../../src/components/Cards/ServiceCard";


{/* Fetch data for upcoming and past services */}
async function getUpcoming() {
  const res = await fetch('http://127.0.0.1:8000/upcoming');
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getPast() {
  const res = await fetch('http://127.0.0.1:8000/past');
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function ServicePage() {
  {/* Store upcoming events */}
  const data = await getUpcoming()
  console.log(data);
  const otrUpcoming = data['Upcoming Service'];
  console.log(otrUpcoming);
  if (!Array.isArray(otrUpcoming)) {
  // Handle the case where otrUpcoming is not an array
  console.error("Upcoming Service data is not an array");
  return null; // or handle it according to your use case
}

  const serviceCards = otrUpcoming.map((service, index) => {

    const name = service['Name'];
    const date = service['Date'];
    const description = service['Description'];
    const keyWords = service['Key_Words'];
    const type = service['Upcoming'];

    if (name) {
      return (
          <ServiceCard key={index} name={name} date={date} />
      );
    }
    return null;
  });

  {/* Store past services */}
  const dataPast = await getPast()

  const otrPast = dataPast['Past Services'];

  const servicesCardsPast = otrPast.map((service, index) => {
    const name = service['Name'];
    const date = service['Date'];
    const description = service['Description'];
    const keyWords = service['Key_Words'];
    const type = service['Type'];

    if (name) {
      return (
          <ServiceCard key={index} name={name} date={date} />
      );
    }
    return null;
  });

  {/* Style Page */}
  {/* Utilizes the Service Card Component in /src/components/cards */}
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* Upcoming Services */}
      <Box>
        <center>
        <Typography variant="h5" style={{ color: 'white' }}>
          Upcoming Services
        </Typography>
        </center>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {serviceCards.map((card, index) => (
            <Box key={index} margin="0 10px 20px 10px" width="250px">
              {card}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Past Service */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" style={{ color: 'white' }}>
          Past Service
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {servicesCardsPast.map((card, index) => (
            <Box key={index} margin="0 10px 20px 10px" width="250px">
              {card}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );



};