'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Button, Paper, Typography, TextField,  } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function getData(params) {
  return fetch("http://127.0.0.1:8000/event/" + params.id)
    .then(res => {
      if (!res.ok) {
        throw Error("Failed to fetch data");
      }
      return res.json();
    });
}

async function sendEmail(formData) {
    try {
      console.log(formData)
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
    const params = useParams();
    const [data, setData] = useState({ "Event": {} });

    const [formData, setFormData] = useState({
      email: [],
      subject: "",
      message: "",
    });

    useEffect(() => {
      let isMounted = true;

      getData(params)
        .then(result => {
          if (isMounted) {
            setData(result);

            setFormData({
              ...formData,
              email: result["Event"]["Registered"],
            });
          }
        })
        .catch(error => console.error(error));

      return () => {
        isMounted = false;
      };
    }, [params]);

    const lis = data["Event"]["Registered"];
  

  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuill = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddEvent = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await sendEmail(formData);
      setShowConfirmation(true);

      // Reset the form data
      setFormData({
        email: lis,
        subject: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        {showConfirmation ? (
          <Typography variant="h6" sx={{ color: "success.main", mb: 3 }}>
            Email sent successfully!
          </Typography>
        ) : (
          <form>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange('subject')}
              value={formData.subject}
            />
            <ReactQuill
              onChange={(value) => handleQuill('message')(value)}
              style={{ height: '300px' }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddEvent}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default EmailList;
