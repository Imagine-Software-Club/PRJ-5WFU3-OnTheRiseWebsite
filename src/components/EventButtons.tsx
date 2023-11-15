"use client";

import { Box, Button, Stack } from "@mui/material";
import React from "react";
// import Link from "next/link";

export default function EventButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        href="/upcoming"
        component="a"
        variant="contained"
        color="primary"
      >
        Upcoming
      </Button>

      <Button href="/past" component="a" variant="contained" color="primary">
        Past
      </Button>

      {/* Add more buttons for other pages as needed */}
    </Stack>
  );
}
