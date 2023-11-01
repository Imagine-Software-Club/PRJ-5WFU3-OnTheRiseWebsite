import { Box, Typography, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "blue" }}>
          Welcome to Our Story
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          We are a team of passionate individuals dedicated to making a
          difference. Our mission is to...
          {/* Add your compelling story here */}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          Join us on our journey and be a part of something amazing!
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutUs;
