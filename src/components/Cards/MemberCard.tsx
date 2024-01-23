// ... (previous imports)
'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

interface IMemberCardProps {
  name: string;
  position: string;
  contactInfo?: string;
  imageUrl?: string;
}

const MemberCard: React.FC<IMemberCardProps> = ({ name, position, contactInfo, imageUrl }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleCardFlip = () => {
    setFlipped(!isFlipped);
  };

  useEffect(() => {
    // Trigger initial flip when the component mounts
    setFlipped(true);

    // Reset flip state after a delay (adjust the delay as needed)
    const resetFlip = setTimeout(() => {
      setFlipped(false);
    }, 1000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(resetFlip);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <Card
      sx={{
        maxWidth: 250,
        perspective: "1000px",
        position: "relative",
        cursor: "pointer",
        border: "1px solid black", // Add a black border
        boxShadow: "0px 0px 4px 4px rgba(0, 0, 0, 0.2)", // Add a black shadow
      }}
      onClick={handleCardFlip}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {/* Front Side */}
        <CardMedia
          component="img"
          alt="Member Picture"
          height="140"
          image={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9oVH_W3MWsmcO6UhuSG6SazNf0bBqk-TkDw&usqp=CAU"}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {position}
          </Typography>
        </CardContent>

        {/* Back Side */}
        {contactInfo && (
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <Typography variant="body2">{contactInfo}</Typography>
          </CardContent>
        )}
      </Box>
    </Card>
  );
};

export default MemberCard;
