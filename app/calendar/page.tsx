"use client";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

async function getEvents() {
  console.log("got here")
  const res = await fetch("http://127.0.0.1:8000/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEvents();
        console.log("Event Data:", eventData); // Log the entire event data for debugging
        setEvents(eventData["Events"]  || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const calendarEvents = events.map((event) => {
    console.log("Mapped Event:", event); // Log each mapped event for debugging
    return {
      title: event.Name,
      start: event.Date,
    };
  });

  console.log("Calendar Events:", calendarEvents); // Log the final array of calendar events

  return (
    <Box>
      <center>
        <br></br>
        {/* Add your EventButtons component here if needed */}
        <br></br>
      </center>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </Box>
  );
}