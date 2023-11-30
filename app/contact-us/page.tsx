'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

async function sendEmail(formData) {
  try {
    const res = await fetch('http://127.0.0.1:8000/contact_us', {
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


const ContactUs = () => {
  const [formData, setFormData] = useState({
    subject: "",
    from_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddEvent = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await sendEmail(formData);
      setShowConfirmation(true);

      // Reset the form after submission
      setFormData({
        subject: "",
        from_email: "",
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
          Contact Us
        </Typography>
        {showConfirmation ? (
          <Typography variant="h6" sx={{ color: "success.main", mb: 3 }}>
            Your message has been sent successfully!
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
            <TextField
              label="Your Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange('from_email')}
              value={formData.from_email}
            />
            <TextField
              label="Your Message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange('message')}
              value={formData.message}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddEvent}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ContactUs;