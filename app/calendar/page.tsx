"use client";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface IEvent {
  Name: string;
  Date: string;
  // Add other properties as needed
}

async function getEvents(): Promise<{ Events: IEvent[] }> {
  console.log("got here");
  const res = await fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/events");
  if (!res.ok) {
    throw Error("Failed to fetch data");
  }

  return res.json();
}

export default function CalendarPage() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEvents();
        console.log("Event Data:", eventData); // Log the entire event data for debugging
        setEvents(eventData.Events || []);
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
        <br />
        {/* Add your EventButtons component here if needed */}
        <br />
      </center>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </Box>
  );
}
