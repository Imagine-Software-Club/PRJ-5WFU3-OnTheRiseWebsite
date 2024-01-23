'use client';

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDN1I86mQrlp0BxQC5KF7gtYwqDlCz6ZQs",
  authDomain: "otrwebsite-cf4d6.firebaseapp.com",
  projectId: "otrwebsite-cf4d6",
  storageBucket: "otrwebsite-cf4d6.appspot.com",
  messagingSenderId: "933001896271",
  appId: "1:933001896271:web:1abf3e97f61126776a653a",
  measurementId: "G-9JRVNRGMLY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function postEvent(formData:any) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw Error('User not logged in');
    }

    const idToken = await user.getIdToken();

    // Make the Firestore API request with the user's ID token in the Authorization header
    const res = await fetch('https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/events/' + formData.name, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${idToken}`, // Include the user's ID token in the Authorization header
      },
      body: JSON.stringify({
        fields: {
          Name: { stringValue: formData.name },
          Date: { stringValue: formData.date },
          Description: { stringValue: formData.description },
          Thumbnail: { stringValue: formData.thumbnail },
          Registered: { arrayValue: { values: [] } },
        },
      }),
    });

    if (!res.ok) {
      throw Error('Failed to post event');
    }
  } catch (error) {
    console.error("afdlakdfj");
    // Handle the error as needed, e.g., show a notification to the user
  }
}


  

  interface CreateEventProps {
    name: string;
    date: string;
    description: string;
    thumbnail: string;
  }

const CreateEvent: React.FC<CreateEventProps> = ({ name, date, description, thumbnail}) => {
  const [formData, setFormData] = useState({
    name: name,
    date: date,
    description: description,
    thumbnail: thumbnail
  });

  const [userLoggedIn, setUserLoggedIn] = useState(true); // State to track user login status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuill = (field:any) => (value:any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddEvent = () => {
    if (!userLoggedIn) {
      alert('You need to be logged in to add an event.'); // Show a warning message
      return;
    }

    if (!formData.name || !formData.date || !formData.description || !formData.thumbnail) {
      alert('All fields are required.');
      return;
    }

    postEvent(formData);
    setFormData({
      name: "",
      date: "",
      description: "",
      thumbnail: ""
    });
  };

  return (
  <div>
    {!userLoggedIn && (
      <div style={{ color: 'red', marginBottom: '16px' }}>
        Warning: You are not logged in. Please log in to add an event.
      </div>
    )}

    <TextField label="Event Name" fullWidth margin="normal" value={formData.name} onChange={handleChange('name')} required />
    <TextField type="Date" fullWidth margin="normal" value={formData.date} onChange={handleChange('date')} required/>
   
    <ReactQuill
      value={formData.description}
      onChange={(value) => handleQuill('description')(value)}
    />
    <TextField label="Image Link" fullWidth margin="normal" value={formData.thumbnail} onChange={handleChange('thumbnail')} required/>
    
    <center>
    <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleAddEvent}>
      Add Event
    </Button>
    </center>
  </div>
);

};

export default CreateEvent;
