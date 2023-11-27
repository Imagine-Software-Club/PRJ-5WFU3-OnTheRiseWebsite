'use client';

import { Box, Typography, Paper, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import RegisterForm from "../../../src/components/Forms/registerForm";

async function getData(params) {
  const res = await fetch("http://127.0.0.1:8000/event/" + params.id);
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

async function EventsPage() {
  const params = useParams();
  const data = await getData(params);

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

        {/* Intuit Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} p={3}>
            <RegisterForm event={data["Event"]["Name"]}/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventsPage;
