import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({img, text, head}) {
  return (
    <Card sx={{ maxWidth: '100%', backgroundColor: 'transparent', height: '500px',
    backgroundImage: 'linear-gradient(180deg, #d6e2eb 0%, #F3F0FF 100%)', boxShadow:'none', borderRadius: 4, padding: 3 }}>
      <img src={img} alt='img' width={'100%'}></img>
      <CardContent>
      <Typography gutterBottom variant="h6" component="div">
          {head}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}