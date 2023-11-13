'use client'

import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import EventCard from "../../../src/components/Cards/EventCard";


async function getEvent(id: string) {
  const res = await fetch('http://127.0.0.1:8000/event/${id}', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const product = await res.json()
 
  return Response.json({ product })
}

export default async function EventsPage() {
  // Get the 'id' from the query parameters

  const router = useParams();


  console.log(id);
  // const otrUpcoming = data['Upcoming Events'];

  // const eventCards = otrUpcoming.map((event, index) => {

  //   const name = event['Name'];
  //   const date = event['Date'];
  //   const description = event['Description'];
  //   const keyWords = event['Key_Words'];
  //   const type = event['Upcoming'];

  //   if (name) {
  //     return (
  //         <EventCard key={index} name={name} date={date} />
  //     );
  //   }
  //   return null;
  // });

  {/* Style Page */}
  {/* Utilizes the Event Card Component in /src/components/cards */}
  return (
    <Box>
      
    </Box>
    // <Box display="flex" flexDirection="column" alignItems="center">
    //   {/* Upcoming Events */}
    //   <Box>
    //     <center>
    //     <Typography variant="h5" style={{ color: 'white' }}>
    //       Upcoming Events
    //     </Typography>
    //     </center>
    //     <Box display="flex" flexWrap="wrap" justifyContent="center">
    //       {eventCards.map((card, index) => (
    //         <Box key={index} margin="0 10px 20px 10px" width="250px">
    //           {card}
    //         </Box>
    //       ))}
    //     </Box>
    //   </Box>
  
    // </Box>
  );
  
  

};