"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import ClearIcon from "@mui/icons-material/Clear";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';

import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


async function deleteEvent(eventName: any) {
  try {
    const user = auth.currentUser;

    if (!user) {
        throw Error('User not logged in');
      }

    const idToken = await user.getIdToken();

    const res = await fetch("https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/events/" + eventName, {
      method: "DELETE",
      headers: {
          'Authorization': `Bearer ${idToken}`
        }
    });

    if (!res.ok) {
      throw Error("Failed to delete event");
    }
  } catch (error) {
    console.error("afkladsf");
    // Handle the error as needed, e.g., show a notification to the user
  }
}

async function editEvent(name: any, formData: any) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw Error('User not logged in');
    }

    const idToken = await user.getIdToken();

    // Fetch the existing document
    const existingRes = await fetch(`https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/events/${name}`);
    const existingData = await existingRes.json();

    // Merge the new data with the existing data
    const updatedData = {
      ...existingData.fields,
      Name: { stringValue: name },
      Date: { stringValue: formData.date },
      Description: { stringValue: formData.description },
      Thumbnail: { stringValue: formData.thumbnail },
    };

    // Send the updated document back to Firestore
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/events/${name}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        fields: updatedData,
      }),
    });

    if (!res.ok) {
      throw Error('Failed to update event');
    }
  } catch (error) {
    console.error("afdkljfdals");
  }
}


const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  width: "100%",
  height: "80px", // Set a fixed height for each row
  backgroundColor: "#f5f5f5", // Light gray background color
};

const formStyle = {
  padding: "16px",
  backgroundColor: "#ffffff",
  width: "100%",
};

interface IEventRowProps {
  name: string;
  date: string;
  description: string;
  thumbnail: string;
}

const EventRow: React.FC<IEventRowProps> = ({
  name,
  date,
  description,
  thumbnail,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    date: date,
    description: description,
    thumbnail: thumbnail,
  });

  const handleDelete = async () => {
    await deleteEvent(name);
  };

  const handleEdit = () => {
    setEditedData({ name, date, description, thumbnail });
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();

    editEvent(name, editedData);
  };

  const handleQuill = (field: any) => (value: any) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleChange = (field: any) => (e: any) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <>
      <ListItem sx={style}>
        <ListItemText primary={name} secondary={`Date: ${date}`} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton href={"/admin/mail/" + name}>
            <MailIcon />
          </IconButton>

          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
        </div>
      </ListItem>
      <Divider />
      {isEditing && (
     <Box sx={formStyle}>
      
        <form onSubmit={handleSubmitEdit}>
          {/* Add form fields for editing */}
          <TextField
            type="Date"
            fullWidth
            margin="normal"
            value={editedData.date}
            onChange={handleChange("date")}
          />

      <ReactQuill
        value={editedData.description}
        onChange={(value) => handleQuill("description")(value)}
      />


          <TextField
            fullWidth
            margin="normal"
            value={editedData.thumbnail}
            onChange={handleChange("thumbnail")}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Save Changes
          </Button>
        </form>
      
    </Box>
    )}
    </>
  );
};

export default EventRow;
