import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IEventCardProps {
  name: string;
  date: string;
}

const EventCard: React.FC<IEventCardProps> = ({ name, date }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={"http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FOnTheRiseLogo.1ecdc1fb.png&w=1080&q=75"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" href = "/event/{name}">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
