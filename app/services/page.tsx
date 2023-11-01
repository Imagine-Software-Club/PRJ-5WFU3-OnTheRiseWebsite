import { Box, Typography, Paper } from "@mui/material";

const Services = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
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
        <Typography variant="h4" sx={{ color: "green" }}>
          Our Services
        </Typography>

        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          <strong>1. Lorem Ipsum Service</strong>
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          justo nunc, scelerisque vel odio at, efficitur tincidunt justo.
        </Typography>

        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          <strong>2. Ipsum Lorem Solutions</strong>
        </Typography>
        <Typography variant="body2">
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis.
        </Typography>

        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          <strong>3. Consectetur Adipiscing Service</strong>
        </Typography>
        <Typography variant="body2">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Typography>

        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          <strong>4. Sed Do Eiusmod Service</strong>
        </Typography>
        <Typography variant="body2">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Typography>

        <Typography variant="body1" sx={{ marginTop: "15px" }}>
          <strong>5. Tempor Incididunt Service</strong>
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Services;
