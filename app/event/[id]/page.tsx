'use client';

import { Box, Typography, Paper, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import RegisterForm from "../../../src/components/Forms/registerForm";// Import the necessary components and styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

async function getData(params) {
  const res = await fetch("http://127.0.0.1:8000/event/" + params.id);
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

async function EventsPage() {
  var data = {"Event": {}}
  const params = useParams();
  data = await getData(params);

  const images = data["Event"]["Images"] || [];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {/* Event Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} p={3}>
            <center>
              <Typography variant="h4">{data["Event"]["Name"]}</Typography>
              <Typography variant="body1">{data["Event"]["Description"]}</Typography>
              <Typography variant="body2">Date: {data["Event"]["Date"]}</Typography>
              <Typography variant="body2">Time: {data["Event"]["Time"]}</Typography>
            </center>
          </Paper>
        </Grid>

         {/* Image Slideshow */}
         <Grid item xs={12} md={6}>
          <Paper elevation={3} p={3}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Event Image ${index}`} style={{ width: "100%", height: "auto" }} />
                </div>
              ))}
            </Slider>
          </Paper>
        </Grid>


        {/* Register Form */}
        <Grid item xs={12} md={6}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <RegisterForm event={data["Event"]["Name"]} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventsPage;
