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
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f8f8', border: '2px solid #ff9800', borderRadius: '8px' }}>
      <CardMedia
        component="img"
        alt="Event Image"
        height="140"
        image="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FOnTheRiseLogo.1ecdc1fb.png&w=1080&q=75"
        style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', color: '#333' }}>
          Date: {date}
        </Typography>
      </CardContent>
      <CardActions sx={{ borderTop: '2px solid #ff9800', marginTop: 'auto' }}>
        <Button size="small" href={`/event/${name}`} sx={{ color: '#ff9800', fontWeight: 'bold' }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
