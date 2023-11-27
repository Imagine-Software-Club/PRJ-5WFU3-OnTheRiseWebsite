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
  padding: '16px',
  width: '100%',
};

interface IEventRowProps {
  name: string;
  date: string;
  description: string;
  type: string;
  pictures: string;
  keyWords: string;
}

const EventRow: React.FC<IEventRowProps> = ({ name, date, description, type, pictures, keyWords }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    date: date,
    description: description,
    type: type,
    pictures: "",
    keyWords: ""
  });

  const handleDelete = async () => {
    await deleteEvent(name);
  };

  const handleEdit = () => {
    setEditedData({ name, date, description, type, pictures, keyWords });
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    editEvent(name, editedData);
  };

  const handleChange = (field) => (e) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <>
      <ListItem style={style}>
        <ListItemText primary={name} secondary={`Date: ${date}, Type: ${type}`} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton href = {"/admin/mail/" + name}>
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
        <form onSubmit={handleSubmitEdit}>
          {/* Add form fields for editing */}
          <TextField label="Edit Name" fullWidth margin="normal" value={editedData.name} onChange={handleChange('name')} />
          <TextField type = "Date" fullWidth margin="normal" value={editedData.date} onChange={handleChange('date')} />
          <TextField label="Edit Description" multiline rows={4} fullWidth margin="normal" value={editedData.description} onChange={handleChange('description')} />
          {/* Add other fields as needed */}

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Save Changes
          </Button>
        </form>
      )}
    </>
  );
}

export default EventRow;
