"use client";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Define an interface for the expected structure of the API response
interface EventData {
  Event: {
    Registered: string[]; // Assuming 'Registered' is an array of emails
    // Add other properties as needed
  };
  // Add other properties as needed
}

function getData(params: any): Promise<{ Event: { Registered: string[] } }> {
  return fetch("https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/event/" + params.id)
    .then(res => {
      if (!res.ok) {
        throw Error("Failed to fetch data");
      }
      return res.json();
    });
}

async function sendEmail(formData: any, user: any) {
  try {
    console.log(formData)
    const res = await fetch('https://prj-5-wfu-3-on-the-rise-website-lovat.vercel.app/emailList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user?.getIdToken()}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw Error('Failed to post event');
    }
  } catch (error) {
    console.error(error);
  }
}

const EmailList = () => {
  const params = useParams();
  const [data, setData] = useState<EventData>({ Event: { Registered: [] } });
  const [user, setUser] = useState<any | null>(null); // State to store user information

  const [formData, setFormData] = useState({
    email: [] as string[], // Assuming 'email' is an array of strings
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check user login status
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // Fetch event data
    getData(params)
      .then((result: EventData) => {
        if (isMounted) {
          setData({ Event: result["Event"] });


          setFormData({
            ...formData,
            email: result["Event"]["Registered"],
          });
        }
      })
      .catch(error => console.error(error));

    return () => {
      isMounted = false;
      unsubscribe(); // Unsubscribe from the auth state change listener
    };
  }, [params]);

  const lis = data["Event"]["Registered"];

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuill = (field: any) => (value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddEvent = async () => {
    if (!user) {
      alert('You need to be logged in to send emails.'); // Show a warning message
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await sendEmail(formData, user);
      setShowConfirmation(true);

      // Reset the form data
      setFormData({
        email: lis,
        subject: "",
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
          Send an email to everyone registered!
        </Typography>
        {showConfirmation ? (
          <Typography variant="h6" sx={{ color: "success.main", mb: 3 }}>
            Email sent successfully!
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
            <ReactQuill
              onChange={(value) => handleQuill('message')(value)}
              style={{ height: '300px' }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddEvent}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default EmailList;
