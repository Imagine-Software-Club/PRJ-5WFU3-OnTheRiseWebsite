"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import ClearIcon from '@mui/icons-material/Clear';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

async function deleteEvent(eventName) {
  try {
    const res = await fetch('http://127.0.0.1:8000/event/delete/' + eventName, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw Error("Failed to delete event");
    }
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed, e.g., show a notification to the user
  }
}

async function editEvent(name, formData) {
  console.log(formData)
  try {
    const res = await fetch('http://127.0.0.1:8000/event/update/' + name, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw Error('Failed to edit event');
    }
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed, e.g., show a notification to the user
  }
}

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  width: '100%',
  height: '80px', // Set a fixed height for each row
  backgroundColor: '#f5f5f5', // Light gray background color
};

const formStyle = {
  padding: '16px',
  backgroundColor: '#ffffff', // White background color
  width: '100%',
};

interface IEventRowProps {
  name: string;
  date: string;
  description: string;
  thumbnail: string;
}

const EventRow: React.FC<IEventRowProps> = ({ name, date, description, thumbnail}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    date: date,
    description: description,
    thumbnail: thumbnail
  });

  const handleDelete = async () => {
    await deleteEvent(name);
  };

  const handleEdit = () => {
    setEditedData({ name, date, description, thumbnail });
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    editEvent(name, editedData);
  };

  const handleQuill = (field) => (value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleChange = (field) => (e) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <>
      <ListItem sx={style}>
        <ListItemText primary={name} secondary={`Date: ${date}`} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton href={"/admin/mail/" + name}>
            <MailIcon />
          </IconButton>

          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
        </div>
      </ListItem>
      <Divider />

      {isEditing && (
        <form onSubmit={handleSubmitEdit} sx={formStyle}>
          {/* Add form fields for editing */}
          <TextField label="Edit Name" fullWidth margin="normal" value={editedData.name} onChange={handleChange('name')} />
          <TextField type="Date" fullWidth margin="normal" value={editedData.date} onChange={handleChange('date')} />
         
          <ReactQuill
            label="Edit Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={editedData.description}
            onChange={(value) => handleQuill('description')(value)}
        />

        <TextField fullWidth margin="normal" value={editedData.thumbnail} onChange={handleChange('thumbnail')} />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Save Changes
          </Button>
        </form>
      )}
    </>
  );
}

export default EventRow;
