import { Box, Typography, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "ffff00",
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
        <Typography variant="h4" sx={{ color: "black" }}>
          Welcome To On The Rise
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          We are a team of passionate individuals dedicated to making a difference
            on Michigan State Universities Campus. Our mission is to bring people together
            and create a community of like minded individuals who want to be involved in community based activities.
          {/* Add your compelling story here */}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          Join us on our journey and be a part of THE BEST ORG ON CAMP!
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutUs;
