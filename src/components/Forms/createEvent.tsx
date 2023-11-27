'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    pictures: string;
    keyWords: string;
    type: string;
  }
  

const CreateEvent: React.FC<CreateEventProps> = ({ name, date, description}) => {
  const [formData, setFormData] = useState({
    name: name,
    date: date,
    description: description,
    type: "Upcoming",
    pictures: "",
    keyWords: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddEvent = () => {
    postEvent(formData)
    setFormData({
      name: "",
      date: "",
      description: "",
      pictures: "",
      keyWords: "",
      type: "Upcoming"
    });
  };

  return (
    <div>
      <TextField label="Event Name" fullWidth margin="normal" value={formData.name} onChange={handleChange('name')} />
      <TextField type="Date" fullWidth margin="normal" value={formData.date} onChange={handleChange('date')} />
      <TextField type="Time" fullWidth margin="normal"/>
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={formData.description}
        onChange={handleChange('description')}
      />
      <TextField label="Type" fullWidth margin="normal" value={formData.type} onChange={handleChange('type')} />
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleAddEvent}>
        Add Event
      </Button>
    </div>
  );
};

export default CreateEvent;
