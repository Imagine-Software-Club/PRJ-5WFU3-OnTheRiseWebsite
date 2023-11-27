import React from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";

const ServiceCard = ({ number, title, description }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ flexGrow: 1, flexBasis: "50%", mb: "3%" }}
    >
      <Typography variant="body1">
        <strong>{`${number}. ${title}`}</strong>
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
};

const Services = () => {
  return (
    <Stack
      sx={{
        mb: "10%",
        width: "100%",
        height: "100vh",
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
          background: "#f5f5f5",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "green",
            mb: "3%",
            fontFamily: "cursive",
            fontSize: "2rem",
          }}
        >
          Explore Our Services
        </Typography>

        <ServiceCard
          number={1}
          title="Community Service"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo nunc, scelerisque vel odio at, efficitur tincidunt justo."
        />
        <ServiceCard
          number={2}
          title="Leadership"
          description="Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis."
        />
        <ServiceCard
          number={3}
          title="Development"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <ServiceCard
          number={4}
          title="Entertainment"
          description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }} href = "/contact-us">
        Interested, Work with Us!
        </Button>
      </Paper>
    </Stack>
  );
};

export default Services;
