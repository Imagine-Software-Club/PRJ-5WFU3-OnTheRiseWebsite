import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

interface IEventRowProps {
  name: string;
  position: string;
  major: string;
}

const MemberRow: React.FC<IEventRowProps> = ({ name, position, major }) => {
  return (
    <>
      <ListItem style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', width: '100%' }}>
        <ListItemText primary={name} secondary={`Role: ${position}, Major: ${major}`} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button><EditIcon style={{ cursor: 'pointer' }} /></button>
          
        <button><ClearIcon style={{ cursor: 'pointer', marginLeft: '16px' }} /></button>
        </div>
      </ListItem>
      <Divider />
    </>
  );
}

export default MemberRow;
