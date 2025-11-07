import React from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";



interface ReviewCardProps {
  title: string;
  body?: string;
  rating?: number;
  movieImage?: string;
  userName: string

}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title, body, rating, movieImage, userName
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={movieImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {body}
          </Typography>
         {/*  <Typography variant="body2" color="text.secondary" gutterBottom>
            Release Date: {releaseDate}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Rating name="read-only" value={3} readOnly size="small" />
        <Typography variant="body2" sx={{ ml: 1 }} color="text.secondary">
          {rating}/5
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Movie: {title} | By: {userName}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;