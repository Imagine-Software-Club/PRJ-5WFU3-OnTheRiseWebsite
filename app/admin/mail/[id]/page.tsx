'use client';

import React, { useState } from 'react';
import { Box, Button, Paper, Typography, TextField,  } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


async function sendEmail(formData) {
    try {
      const res = await fetch('http://127.0.0.1:8000/emailList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw Error('Failed to post event');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

const EmailList = () => {
  const [formData, setFormData] = useState({
    email: ["swabhankatkoori@gmail.com", "katkoor4@msu.edu"],
    subject: "",
    message: ""
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuill = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddEvent = () => {
    sendEmail(formData);

    // Reset the form data
    setFormData({
        email: ["swabhankatkoori@gmail.com", "katkoor4@msu.edu"],
        subject: "",
        message: ""
      });
  };


  

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "green", mb: 3 }}>
          Send an email to everyone registered!
        </Typography>
        <form>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange('subject')}
          />

          <ReactQuill
            onChange={(value) => handleQuill('message')(value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddEvent}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EmailList;
