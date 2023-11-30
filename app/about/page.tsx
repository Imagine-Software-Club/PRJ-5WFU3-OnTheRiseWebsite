'use client'
import { Box, Typography, Paper } from "@mui/material";
import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    // Check if we are on the client side before running client-specific code
    if (typeof window !== "undefined") {
      const container = document.getElementById("confetti-container");

      const generateRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      };

      // Generate confetti elements
      for (let i = 0; i < 200; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        container.appendChild(confetti);

        // Set random position for each confetti element
        const startPositionX = Math.random() * window.innerWidth;
        const startPositionY = Math.random() * window.innerHeight;
        confetti.style.left = `${startPositionX}px`;
        confetti.style.top = `${startPositionY}px`;

        // Set random color for each confetti element
        confetti.style.backgroundColor = generateRandomColor();
      }

      // Cleanup function to remove confetti after animation
      setTimeout(() => {
        const confettiElements = document.getElementsByClassName("confetti");
        while (confettiElements.length > 0) {
          confettiElements[0].parentNode.removeChild(confettiElements[0]);
        }
      }, 5000); // Adjust the duration to match the animation duration
    }
  }, []); // Empty dependency array ensures this runs only once on the client side

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

        .confetti {
          width: 10px;
          height: 10px;
          background-color: #${Math.floor(Math.random() * 16777215).toString(16)}; /* Random color */
          position: absolute;
          animation: fall 5s linear; /* Adjust the duration as needed */
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          textAlign: "center",
          position: "relative",
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
