'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


async function postMember(formData) {
    try {
      const res = await fetch('http://127.0.0.1:8000/members/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw Error('Failed to post member');
      }
    } catch (error) {
      console.error(error.message);
      // Handle the error as needed, e.g., show a notification to the user
    }
  }
  

  interface CreateEventProps {
    name: string;
    role: string;
    major: string;
    image: string;
  }
  

const CreateMember: React.FC<CreateEventProps> = ({ name, role, major, image}) => {
  const [formData, setFormData] = useState({
    name: name,
    role: role,
    major: major,
    image: image
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };


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
      <TextField label="Name" fullWidth margin="normal" value={formData.name} onChange={handleChange('name')} />
      <TextField label="Role" fullWidth margin="normal" value={formData.role} onChange={handleChange('role')} />
      <TextField label="Major" fullWidth margin="normal" value={formData.major} onChange={handleChange('major')} />
      <TextField label="Image Link" fullWidth margin="normal" value={formData.image} onChange={handleChange('image')} />
    
      
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleAddMember}>
        Add Member
      </Button>
    </div>
  );
};

export default CreateMember;
