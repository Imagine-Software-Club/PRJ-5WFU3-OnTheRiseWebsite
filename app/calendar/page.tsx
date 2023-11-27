'use client'

import { Box } from "@mui/material";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



export default async function CalendarPage() {
    return (
        
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        />
    )
      
}

export const dynamic = "force-dynamic";