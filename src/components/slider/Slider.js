import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Rating } from "@mui/material";

function CustSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {Array.from(Array(6)).map((_, index) => (
        <div>
        <Card sx={{ maxWidth: '100%', mx: 2, boxShadow:'none', bgcolor:'light.white' }}>
      <CardContent>
      <Grid container spacing={2} sx={{mb: 2, alignItems:'center'}}>
          <Grid item xs={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item xs={6}>
          <Typography variant="h6" component="div">
        Leo
        </Typography>
        <Typography variant="body1" component="div">
        Lead Designer
        </Typography>
          </Grid>
          <Grid item xs={4} sx={{textAlign:'end'}}>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </Grid>
      </Grid>
        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:'center'}}>
        It was a very good experience
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu.        </Typography>
      </CardContent>
    </Card>
        </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustSlider;
