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

const firebaseConfig = {
  apiKey: "AIzaSyDN1I86mQrlp0BxQC5KF7gtYwqDlCz6ZQs",
  authDomain: "otrwebsite-cf4d6.firebaseapp.com",
  projectId: "otrwebsite-cf4d6",
  storageBucket: "otrwebsite-cf4d6.appspot.com",
  messagingSenderId: "933001896271",
  appId: "1:933001896271:web:1abf3e97f61126776a653a",
  measurementId: "G-9JRVNRGMLY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


async function deleteService(serviceName:any) {
  try {
    const user = auth.currentUser;

    if (!user) {
        throw Error('User not logged in');
      }

    const idToken = await user.getIdToken();

    const res = await fetch("https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/Services/" + serviceName, {
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

interface IServiceRowProps {
  title: string;
  description: string;
  link: string;
  keywords: string;
}

const ServiceRow: React.FC<IServiceRowProps> = ({ title, description, link, keywords }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: title,
    description: description,
    link: link,
    keywords: keywords
  });

  const handleDelete = async () => {
    await deleteService(title);
  };

  const handleEdit = () => {
    setEditedData({ title, description, link, keywords });
    setIsEditing(!isEditing);
  };

  const handleChange = (field:any) => (e:any) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <ListItem sx={style}>
          <ListItemText primary={title} />
          <Box style={{ display: "flex", alignItems: "center" }}>

            <IconButton onClick={handleDelete}>
              <ClearIcon />
            </IconButton>
          </Box>
        </ListItem>
        <Divider />
      </Stack>
    </Box>
  );
};

export default ServiceRow;
