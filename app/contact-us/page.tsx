import { Box, TextField, Button } from "@mui/material";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import { sendEmail } from "../../app/lib/email";



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
          {handler}
        </Button>
      </form>
    </Box>
  );
};
 
async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sendEmail({
    to: "5wfu3.imagine@gmail.com",
    subject: "Welcome to NextAPI",
    html: render(ContactUs()),
  });

  return res.status(200).json({ message: "Email sent successfully" });
}

export default ContactUs;

