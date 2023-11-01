import { Box, TextField, Button } from "@mui/material";

const ContactUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs;
