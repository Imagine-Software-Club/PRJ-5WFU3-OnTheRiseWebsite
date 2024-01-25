'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
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

async function postService(formData:any) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw Error('User not logged in');
    }

    const idToken = await user.getIdToken();

    const res = await fetch('https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/Services/'+ formData.title, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${idToken}`, // Include the user's ID token in the Authorization header
      },
      body: JSON.stringify({
        fields: {
          Title: { stringValue: formData.title },
          Description: { stringValue: formData.description },
          Link: { stringValue: formData.link },
          Keywords: { stringValue: formData.keywords },
        },
      }),
    });

    if (!res.ok) {
      throw Error('Failed to post Service');
    }
  } catch (error) {
    console.error("dfasfds");
    // Handle the error as needed, e.g., show a notification to the user
  }
}

interface CreateServiceProps {
    title: string;
    description: string;
    link: string;
    keywords: string;
}

const CreateService: React.FC<CreateServiceProps> = ({ title, description, link, keywords }) => {
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    link: link,
    keywords: keywords
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const userLoggedIn = auth.currentUser !== null;

  const handleAddService = () => {
    postService(formData)
    setFormData({
        title: "",
        description: "",
        link: "",
        keywords: ""
    });
  };

  return (
    <Box>
      {!userLoggedIn && (
        <Box style={{ color: 'red', marginBottom: '16px' }}>
          Warning: You are not logged in. Please log in to add a Service.
        </Box>
      )}

      <TextField label="Title" fullWidth margin="normal" value={formData.title} onChange={handleChange('title')} />
      <TextField label="Contact Info" fullWidth margin="normal" value={formData.description} onChange={handleChange('description')} />
      <TextField label="Link" fullWidth margin="normal" value={formData.link} onChange={handleChange('link')} />
      <TextField label="Keywords" fullWidth margin="normal" value={formData.keywords} onChange={handleChange('keywords')} />

      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="10vh"
>
      <Button variant="contained" color="primary" style={{ marginTop: '16px', marginBottom: '16px'}} onClick={handleAddService}>
        Add Service
      </Button>
      </Box>
    </Box>
  );
};

export default CreateService;
