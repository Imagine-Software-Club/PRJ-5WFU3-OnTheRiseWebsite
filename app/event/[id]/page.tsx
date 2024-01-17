// EventsPage.jsx
"use client";

import { Box, Typography, Paper, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import RegisterForm from "../../../src/components/Forms/registerForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function getData(params) {
  return fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/event/" + params.id)
    .then(res => {
      if (!res.ok) {
        throw Error("Failed to fetch data");
      }
      return res.json();
    });
}

function EventsPage() {
  const params = useParams();
  const [data, setData] = useState({ "Event": {} });

  useEffect(() => {
    let isMounted = true;

    getData(params)
      .then(result => {
        if (isMounted) {
          setData(result);
        }
      })
      .catch(error => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {/* Event Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} p={3} style={{ width: "100%", height: "auto" }}>
            <center>
              <Typography variant="h4">{data["Event"]["Name"]}</Typography>
              <Typography variant="body2">Date: {data["Event"]["Date"]}</Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: data["Event"]["Description"] }} />
              
         
            </center>
          </Paper>
        </Grid>

        {/* Register Form */}
        <Grid item xs={12} md={6}>
          <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <RegisterForm event={data["Event"]["Name"]}/>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventsPage;
