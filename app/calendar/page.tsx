'use client'

import { Box } from "@mui/material";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventButtons from "../../src/components/EventButtons";



export default async function CalendarPage() {
    return (
        <Box>
        <center>
            <br></br>
            <EventButtons />
            <br></br>
        </center>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        />
        </Box>
    )
      
}

export const dynamic = "force-dynamic";