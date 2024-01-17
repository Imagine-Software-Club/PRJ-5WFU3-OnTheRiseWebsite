// "use client";

// import { Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import EventRow from "../../../src/components/AdminRows/eventRow";
// import CreateEvent from "../../../src/components/Forms/createEvent";

// // Function to fetch data
// async function getData() {
//   // Fetch OTR Members Info
//   const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/events");
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// function MembersPage() {
//   const [otrEvents, setOtrEvents] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getData();
//         setOtrEvents(result?.Events || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   const eventRow = otrEvents.map((event, index) => {
//     const { Name, Date, Description, Thumbnail, Time } = event;

//     if (Name) {
//       return <EventRow key={index} name={Name} date={Date} description={Description} thumbnail={Thumbnail} />;
//     }
//     return null;
//   });


//   const isClient = typeof window !== "undefined";


//   return isClient ? (
//     <Box
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         margin: "75px",
//       }}
//     >
//       <CreateEvent name="" description="" date="" thumbnail="" />
//       <br />
//       <br />
//       {eventRow.map((row, rowIndex) => (
//         <Box key={rowIndex} style={{ marginBottom: "10px" }}>
//           {row}
//         </Box>
//       ))}
//     </Box>
//   ) : null;
// }

// export default MembersPage;
// export const dynamic = "force-dynamic";

// AboutUs.jsx
'use client';
import { Box, Typography, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const AboutUs = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Cleanup function to remove confetti after 4 seconds
    const confettiCleanupTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(confettiCleanupTimeout);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "ffff00",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <style>{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
      `}</style>

      {showConfetti && (
        <div className="confetti-container">
          <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 0}
            height={typeof window !== 'undefined' ? window.innerHeight : 0}
            numberOfPieces={200}
            style={{ display: "block", zIndex: 1 }}
          />
        </div>
      )}

      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "black" }}>
          Welcome To On The Rise
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          We are a team of passionate individuals dedicated to making a difference on Michigan State University's Campus. Our mission is to bring people together and create a community of like-minded individuals who want to be involved in community-based activities.
          {/* Add your compelling story here */}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          Join us on our journey and be a part of THE BEST ORG ON CAMP!
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutUs;

