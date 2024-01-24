"use client";


import { Box, Typography, Paper, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import RegisterForm from "../../../src/components/Forms/registerForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function getData() {
  return fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/events")
    .then(res => {
      if (!res.ok) {
        throw Error("Failed to fetch data");
      }
      return res.json();
    });
}

function EventsPage() {
  const params = useParams();
  const [data, setData] = useState({ Name: "", Date: "", Description: "" });

  useEffect(() => {
    let isMounted = true;

    getData()
      .then(result => {
        if (isMounted) {
          const dataIndex = decodeURIComponent(String(params.id));
          setData(result[dataIndex]);
        }
      })
      .catch(error => console.error(error));

    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      {/* Event Details */}
      <Paper elevation={3} sx={{ width: "100%", p: 3, mb: 3 }}>
      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
          <Typography variant="h4">{data["Name"]}</Typography>
          <Typography variant="body2">Date: {data["Date"]}</Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: data["Description"] }} />
        </Box>
      </Paper>

      {/* Register Form */}
      <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <RegisterForm event={data["Name"]}/>
        </Box>
      </Paper>
    </Box>
  );
}

export default EventsPage;
