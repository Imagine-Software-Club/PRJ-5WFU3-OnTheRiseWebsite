// RegisterForm.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";

async function registerEvent(formData:any, event:any) {
  try {
    formData.event = event;
    const res = await fetch('https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/register', {
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

    return true; // Return true for successful submission
  } catch (error) {
    console.error("fdajkdlfjsd");
    return false; // Return false for failed submission
  }
}

interface RegisterProps {
  event: string;
}

const RegisterForm: React.FC<RegisterProps> = ({ event }) => {
  const [formData, setFormData] = useState({
    email: "",
    first: "",
    last: "",
    phone: "",
    event: event
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddEvent = async () => {
    const success = await registerEvent(formData, event);
    if (success) {
      setSubmitted(true);
    } else {
      // Handle submission failure if needed
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      first: "",
      last: "",
      phone: "",
      event: event
    });
    setSubmitted(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ width: "80%", height: "auto", p: 3 }}>
        <br></br>
        {submitted ? (
          <React.Fragment>
            <Typography variant="h4" align="center" mb={2}>
              Thank you for registering!
            </Typography>
            <Typography variant="body1" align="center" mb={2}>
              We look forward to seeing you at the event.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={resetForm}
              fullWidth
            >
              Register for Another Event
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="h4" align="center" mb={2}>
              Register for Event
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address *"
                    type="email"
                    name="email"
                    required
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange('email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="First Name"
                    type="text"
                    name="firstName"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange('first')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange('last')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange('phone')}
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAddEvent}
                    fullWidth
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterForm;