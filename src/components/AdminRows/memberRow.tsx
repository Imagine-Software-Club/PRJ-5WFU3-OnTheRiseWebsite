"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

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


async function deleteMember(memberName:any) {
  try {
    const user = auth.currentUser;

    if (!user) {
        throw Error('User not logged in');
      }

    const idToken = await user.getIdToken();

    const res = await fetch("https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/Members/" + memberName, {
      method: "DELETE",
      headers: {
          'Authorization': `Bearer ${idToken}`
        }
    });

    if (!res.ok) {
      throw Error("Failed to delete event");
    }
  } catch (error) {
    console.error("afds");
    // Handle the error as needed, e.g., show a notification to the user
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
  backgroundColor: "#ffffff", // White background color
  width: "100%",
};

interface IMemberRowProps {
  name: string;
  role: string;
  major: string;
  image: string;
}

const MemberRow: React.FC<IMemberRowProps> = ({ name, role, major, image }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    role: role,
    major: major,
    image: image,
  });

  const handleDelete = async () => {
    await deleteMember(name);
  };

  const handleEdit = () => {
    setEditedData({ name, role, major, image });
    setIsEditing(!isEditing);
  };

  const handleChange = (field:any) => (e:any) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <ListItem sx={style}>
          <ListItemText primary={name} secondary={`Role: ${role}`} />
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton> */}

            <IconButton onClick={handleDelete}>
              <ClearIcon />
            </IconButton>
          </div>
        </ListItem>
        <Divider />
      </Stack>
    </Box>
  );
};

export default MemberRow;
