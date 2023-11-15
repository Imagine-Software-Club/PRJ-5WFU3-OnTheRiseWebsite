import React from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

const ContactUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Set background color to white
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px", // Increased padding for a larger box
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "green", mb: 3 }}>
          Contact Us
        </Typography>
        <form>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactUs;
