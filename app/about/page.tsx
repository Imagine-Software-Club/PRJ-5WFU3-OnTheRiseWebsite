'use client';
import { Box, Typography, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

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
          left: 0; /* Added line to position it on the left */
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
      `}</style>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          style={{ display: "block", zIndex: 1 }}
        />
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

      <div id="confetti-container" className="confetti-container"></div>
    </Box>
  );
};

export default AboutUs;
