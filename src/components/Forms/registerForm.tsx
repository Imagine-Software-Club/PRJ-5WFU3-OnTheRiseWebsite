import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";

async function registerEvent(formData) {
  try {
    const res = await fetch('http://127.0.0.1:8000/register', {
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

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddEvent = () => {
    registerEvent(formData);
    setFormData({
      email: "",
      first: "",
      last: "",
      phone: "",
      event: event
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} p={3} width="80%" maxwidth="600px">
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
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                * indicates required
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddEvent}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
