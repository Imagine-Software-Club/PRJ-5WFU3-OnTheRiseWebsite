import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AnyCnameRecord } from 'dns';

interface IMemberCardProps {
  name: string;
  position: string;
}

const MemberCard: React.FC<IMemberCardProps> = ({ name, position }) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        alt="Member Picture"
        height="140"
        image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F554%2F554835.png&tbnid=0Ml8n18XNSPHYM&vet=12ahUKEwiYo9LF96CCAxVPwckDHcchD6MQMygGegQIARBk..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ficon%2Femployee_554835&docid=1xr2o3otLvZ0YM&w=512&h=512&q=sample%20image%20of%20person&ved=2ahUKEwiYo9LF96CCAxVPwckDHcchD6MQMygGegQIARBk"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {position}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MemberCard;