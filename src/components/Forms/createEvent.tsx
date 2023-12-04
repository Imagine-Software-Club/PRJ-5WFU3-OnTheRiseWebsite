'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


async function postEvent(formData) {
    try {
      const res = await fetch('http://127.0.0.1:8000/event/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw Error('Failed to post event');
      }
    } catch (error) {
      console.error(error.message);
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

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

    const handleQuill = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };


  const handleAddEvent = () => {
    postEvent(formData)
    setFormData({
      name: "",
      date: "",
      description: "",
      thumbnail: ""
    });
  };

  return (
    <div>
      <TextField label="Event Name" fullWidth margin="normal" value={formData.name} onChange={handleChange('name')} />
      <TextField type="Date" fullWidth margin="normal" value={formData.date} onChange={handleChange('date')} />
      <TextField type="Time" fullWidth margin="normal"/>
     
      <ReactQuill
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={(value) => handleQuill('description')(value)}
        />
      <TextField label="Image Link" fullWidth margin="normal" value={formData.thumbnail} onChange={handleChange('thumbnail')} />
      
      
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleAddEvent}>
        Add Event
      </Button>
    </div>
  );
};

export default CreateEvent;
