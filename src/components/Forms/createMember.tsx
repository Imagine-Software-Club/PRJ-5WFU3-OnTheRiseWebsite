'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

async function postMember(formData:any) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw Error('User not logged in');
    }

    const idToken = await user.getIdToken();

    const res = await fetch('https://firestore.googleapis.com/v1/projects/otrwebsite-cf4d6/databases/(default)/documents/Members/'+ formData.name, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${idToken}`, // Include the user's ID token in the Authorization header
      },
      body: JSON.stringify({
        fields: {
          Name: { stringValue: formData.name },
          Role: { stringValue: formData.role },
          Major: { stringValue: formData.major },
          Image: { stringValue: formData.image },
        },
      }),
    });

    if (!res.ok) {
      throw Error('Failed to post member');
    }
  } catch (error) {
    console.error("dfasfds");
    // Handle the error as needed, e.g., show a notification to the user
  }
}

interface CreateEventProps {
  name: string;
  role: string;
  major: string;
  image: string;
}

const CreateMember: React.FC<CreateEventProps> = ({ name, role, major, image }) => {
  const [formData, setFormData] = useState({
    name: name,
    role: role,
    major: major,
    image: image
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const userLoggedIn = auth.currentUser !== null;

  const handleAddMember = () => {
    postMember(formData)
    setFormData({
      name: "",
      role: "",
      major: "",
      image: ""
    });
  };

  return (
    <div>
      {!userLoggedIn && (
        <div style={{ color: 'red', marginBottom: '16px' }}>
          Warning: You are not logged in. Please log in to add a member.
        </div>
      )}

      <TextField label="Name" fullWidth margin="normal" value={formData.name} onChange={handleChange('name')} />
      <TextField label="Role" fullWidth margin="normal" value={formData.role} onChange={handleChange('role')} />
      <TextField label="Major" fullWidth margin="normal" value={formData.major} onChange={handleChange('major')} />
      <TextField label="Image Link" fullWidth margin="normal" value={formData.image} onChange={handleChange('image')} />

      <center>
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleAddMember}>
        Add Member
      </Button>
      </center>
    </div>
  );
};

export default CreateMember;
